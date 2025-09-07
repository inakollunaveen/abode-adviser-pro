import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Home, Plus, Edit, Trash2, Eye, MapPin, IndianRupee, Upload, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock listings data
const mockListings = [
  {
    id: "1",
    title: "Modern 2BHK Apartment",
    location: "Koramangala, Bangalore",
    price: 25000,
    type: "2BHK",
    status: "active",
    views: 145,
    inquiries: 12
  },
  {
    id: "2",
    title: "Luxury Single Room",
    location: "Indiranagar, Bangalore",
    price: 15000,
    type: "Single Room",
    status: "rented",
    views: 89,
    inquiries: 8
  }
];

const OwnerDashboard = () => {
  const { user } = useAuth();
  const [listings, setListings] = useState(mockListings);
  const [newListing, setNewListing] = useState({
    title: '',
    description: '',
    address: '',
    price: '',
    deposit: '',
    type: '',
    rooms: '',
    bathrooms: '',
    area: '',
    occupancy: '',
    furnishing: '',
    amenities: '',
    photos: [] as File[]
  });
  const [photoPreview, setPhotoPreview] = useState<string[]>([]);

  const handleAddListing = (e: React.FormEvent) => {
    e.preventDefault();
    
    const listing = {
      id: Date.now().toString(),
      title: newListing.title,
      location: newListing.address,
      price: parseInt(newListing.price),
      type: newListing.type,
      status: 'active' as const,
      views: 0,
      inquiries: 0
    };
    
    setListings([listing, ...listings]);
    setNewListing({
      title: '',
      description: '',
      address: '',
      price: '',
      deposit: '',
      type: '',
      rooms: '',
      bathrooms: '',
      area: '',
      occupancy: '',
      furnishing: '',
      amenities: '',
      photos: []
    });
    setPhotoPreview([]);
    
    toast({
      title: "Listing added",
      description: "Your property has been listed successfully.",
    });
  };

  const handleDeleteListing = (id: string) => {
    setListings(listings.filter(listing => listing.id !== id));
    toast({
      title: "Listing deleted",
      description: "Property listing has been removed.",
    });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newPhotos = [...newListing.photos, ...files].slice(0, 5); // Limit to 5 photos
      setNewListing(prev => ({ ...prev, photos: newPhotos }));
      
      // Create preview URLs
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPhotoPreview(prev => [...prev, ...newPreviews].slice(0, 5));
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = newListing.photos.filter((_, i) => i !== index);
    const newPreviews = photoPreview.filter((_, i) => i !== index);
    setNewListing(prev => ({ ...prev, photos: newPhotos }));
    setPhotoPreview(newPreviews);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>;
      case 'rented':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Rented</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Owner Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your property listings and track performance
            </p>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">{listings.length}</p>
                    <p className="text-sm text-muted-foreground">Total Listings</p>
                  </div>
                  <Home className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">{listings.filter(l => l.status === 'active').length}</p>
                    <p className="text-sm text-muted-foreground">Active Listings</p>
                  </div>
                  <Eye className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">{listings.reduce((acc, l) => acc + l.views, 0)}</p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                  </div>
                  <Eye className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">{listings.reduce((acc, l) => acc + l.inquiries, 0)}</p>
                    <p className="text-sm text-muted-foreground">Inquiries</p>
                  </div>
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="listings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="listings" className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>My Listings</span>
              </TabsTrigger>
              <TabsTrigger value="add-listing" className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Add Listing</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="listings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Property Listings</CardTitle>
                  <CardDescription>
                    Manage your property listings and track their performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Property</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Views</TableHead>
                          <TableHead>Inquiries</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {listings.map((listing) => (
                          <TableRow key={listing.id}>
                            <TableCell className="font-medium">
                              <div>
                                <div className="font-semibold">{listing.title}</div>
                                <div className="text-sm text-muted-foreground">{listing.type}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1 text-muted-foreground" />
                                {listing.location}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <IndianRupee className="w-4 h-4 mr-1" />
                                {listing.price.toLocaleString()}/month
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(listing.status)}</TableCell>
                            <TableCell>{listing.views}</TableCell>
                            <TableCell>{listing.inquiries}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button variant="ghost" size="sm">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleDeleteListing(listing.id)}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="add-listing" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="w-5 h-5 text-primary" />
                    <span>Add New Property</span>
                  </CardTitle>
                  <CardDescription>
                    Create a new property listing to attract tenants
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddListing} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Property Title *</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Modern 2BHK Apartment"
                          value={newListing.title}
                          onChange={(e) => setNewListing(prev => ({ ...prev, title: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="type">Property Type *</Label>
                        <Select value={newListing.type} onValueChange={(value) => setNewListing(prev => ({ ...prev, type: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="single">Single Room</SelectItem>
                            <SelectItem value="double">Double Sharing</SelectItem>
                            <SelectItem value="triple">Triple Sharing</SelectItem>
                            <SelectItem value="1bhk">1 BHK</SelectItem>
                            <SelectItem value="2bhk">2 BHK</SelectItem>
                            <SelectItem value="3bhk">3 BHK</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="price">Monthly Rent (₹) *</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="25000"
                          value={newListing.price}
                          onChange={(e) => setNewListing(prev => ({ ...prev, price: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="deposit">Security Deposit (₹) *</Label>
                        <Input
                          id="deposit"
                          type="number"
                          placeholder="50000"
                          value={newListing.deposit}
                          onChange={(e) => setNewListing(prev => ({ ...prev, deposit: e.target.value }))}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="rooms">Number of Rooms</Label>
                        <Input
                          id="rooms"
                          type="number"
                          placeholder="2"
                          value={newListing.rooms}
                          onChange={(e) => setNewListing(prev => ({ ...prev, rooms: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bathrooms">Number of Bathrooms</Label>
                        <Input
                          id="bathrooms"
                          type="number"
                          placeholder="2"
                          value={newListing.bathrooms}
                          onChange={(e) => setNewListing(prev => ({ ...prev, bathrooms: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="area">Area (sq ft)</Label>
                        <Input
                          id="area"
                          type="number"
                          placeholder="1200"
                          value={newListing.area}
                          onChange={(e) => setNewListing(prev => ({ ...prev, area: e.target.value }))}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="occupancy">Preferred Occupancy</Label>
                        <Select value={newListing.occupancy} onValueChange={(value) => setNewListing(prev => ({ ...prev, occupancy: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select occupancy type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bachelors">Bachelors</SelectItem>
                            <SelectItem value="working-professionals">Working Professionals</SelectItem>
                            <SelectItem value="married-couples">Married Couples</SelectItem>
                            <SelectItem value="students">Students</SelectItem>
                            <SelectItem value="family">Family</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Full Address *</Label>
                      <Input
                        id="address"
                        placeholder="Enter complete address with area, city"
                        value={newListing.address}
                        onChange={(e) => setNewListing(prev => ({ ...prev, address: e.target.value }))}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe your property, nearby amenities, and any special features..."
                        rows={4}
                        value={newListing.description}
                        onChange={(e) => setNewListing(prev => ({ ...prev, description: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="amenities">Amenities (comma-separated)</Label>
                      <Input
                        id="amenities"
                        placeholder="Furnished, WiFi, Parking, Security, AC"
                        value={newListing.amenities}
                        onChange={(e) => setNewListing(prev => ({ ...prev, amenities: e.target.value }))}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="photos">Property Photos (Max 5)</Label>
                      <div className="space-y-4">
                        <div className="flex items-center justify-center w-full">
                          <label htmlFor="photos" className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-muted-foreground" />
                              <p className="mb-2 text-sm text-muted-foreground">
                                <span className="font-semibold">Click to upload</span> property photos
                              </p>
                              <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (MAX. 5 photos)</p>
                            </div>
                            <input
                              id="photos"
                              type="file"
                              className="hidden"
                              multiple
                              accept="image/*"
                              onChange={handlePhotoUpload}
                            />
                          </label>
                        </div>
                        
                        {photoPreview.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {photoPreview.map((preview, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={preview}
                                  alt={`Property photo ${index + 1}`}
                                  className="w-full h-24 object-cover rounded-lg border border-border"
                                />
                                <button
                                  type="button"
                                  onClick={() => removePhoto(index)}
                                  className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <Button type="submit" className="bg-gradient-primary">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Property Listing
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OwnerDashboard;
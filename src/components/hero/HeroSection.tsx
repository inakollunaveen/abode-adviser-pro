import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home, IndianRupee } from "lucide-react";

const HeroSection = () => {
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (priceRange) params.set('price', priceRange);
    if (propertyType) params.set('type', propertyType);
    
    navigate(`/search?${params.toString()}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Content */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Find Your{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Dream Home
            </span>
            <br />
            Without Brokers
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect directly with property owners and save on broker fees. 
            Discover thousands of verified rental properties across the city.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-glass backdrop-blur-lg border border-glass rounded-2xl p-6 shadow-elevated">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Location */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Enter location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 bg-background/50 border-border/50 h-12"
              />
            </div>

            {/* Price Range */}
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="bg-background/50 border-border/50 h-12">
                <div className="flex items-center">
                  <IndianRupee className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Price range" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5000-15000">₹5,000 - ₹15,000</SelectItem>
                <SelectItem value="15000-25000">₹15,000 - ₹25,000</SelectItem>
                <SelectItem value="25000-35000">₹25,000 - ₹35,000</SelectItem>
                <SelectItem value="35000-50000">₹35,000 - ₹50,000</SelectItem>
                <SelectItem value="50000+">₹50,000+</SelectItem>
              </SelectContent>
            </Select>

            {/* Property Type */}
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger className="bg-background/50 border-border/50 h-12">
                <div className="flex items-center">
                  <Home className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Property type" />
                </div>
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

            {/* Search Button */}
            <Button 
              onClick={handleSearch}
              className="bg-gradient-primary hover:opacity-90 h-12 font-semibold"
              size="lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
            <div className="text-muted-foreground">Verified Properties</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
            <div className="text-muted-foreground">Happy Tenants</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">0%</div>
            <div className="text-muted-foreground">Broker Fees</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
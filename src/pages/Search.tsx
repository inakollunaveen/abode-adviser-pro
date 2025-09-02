import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchFilters from "@/components/search/SearchFilters";
import PropertyCard from "@/components/property/PropertyCard";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

// Extended sample data for search results
const searchResults = [
  {
    id: "1",
    title: "Modern 2BHK Apartment in Koramangala",
    location: "Koramangala, Bangalore",
    price: 25000,
    type: "2BHK",
    occupancy: "Working Professionals",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rooms: 2,
    amenities: ["Furnished", "WiFi", "Parking"]
  },
  {
    id: "2",
    title: "Luxury Single Room in Indiranagar",
    location: "Indiranagar, Bangalore",
    price: 15000,
    type: "Single Room",
    occupancy: "Bachelors",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rooms: 1,
    amenities: ["AC", "WiFi", "Security"]
  },
  {
    id: "3",
    title: "Spacious 3BHK for Family",
    location: "Whitefield, Bangalore",
    price: 35000,
    type: "3BHK",
    occupancy: "Married Couples",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rooms: 3,
    amenities: ["Furnished", "Gym", "Pool"]
  },
  {
    id: "4",
    title: "Affordable Double Sharing Room",
    location: "Electronic City, Bangalore",
    price: 12000,
    type: "Double Sharing",
    occupancy: "Students",
    image: "https://images.unsplash.com/photo-1556020685-ae41abfc9365?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rooms: 1,
    amenities: ["WiFi", "Laundry", "Security"]
  },
  {
    id: "5",
    title: "Premium 1BHK in BTM Layout",
    location: "BTM Layout, Bangalore",
    price: 18000,
    type: "1BHK",
    occupancy: "Working Professionals",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rooms: 1,
    amenities: ["Furnished", "WiFi", "Balcony"]
  },
  {
    id: "6",
    title: "Cozy Triple Sharing Near Metro",
    location: "Marathahalli, Bangalore",
    price: 8000,
    type: "Triple Sharing",
    occupancy: "Students",
    image: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    rooms: 1,
    amenities: ["Metro Access", "WiFi", "Security"]
  }
];

const Search = () => {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Search Results
                </h1>
                <p className="text-muted-foreground">
                  Found {searchResults.length} properties in Bangalore
                </p>
              </div>
              
              {/* Mobile Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Filters Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <SearchFilters />
            </div>

            {/* Mobile Filters */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-full max-w-sm h-full bg-background border-r border-border overflow-y-auto">
                  <div className="p-4">
                    <SearchFilters onToggle={() => setShowFilters(false)} />
                  </div>
                </div>
              </div>
            )}

            {/* Search Results */}
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {searchResults.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
              
              {/* Load More */}
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Load More Properties
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Search;
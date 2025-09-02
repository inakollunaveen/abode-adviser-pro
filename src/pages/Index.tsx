import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/hero/HeroSection";
import PropertyCard from "@/components/property/PropertyCard";

// Sample data for featured properties
const featuredProperties = [
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
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <HeroSection />
        
        {/* Featured Properties Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Featured Properties
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover handpicked properties that offer the best value and amenities
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

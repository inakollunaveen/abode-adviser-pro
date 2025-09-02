import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Heart, Eye } from "lucide-react";
import { useState } from "react";

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number;
    type: string;
    occupancy: string;
    image: string;
    rooms: number;
    amenities: string[];
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div className="group relative bg-gradient-card rounded-lg overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Favorite button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/60 transition-colors"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorited ? "text-red-500 fill-red-500" : "text-white"
            }`}
          />
        </button>

        {/* Property type badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-primary/90 text-primary-foreground border-0">
            {property.type}
          </Badge>
        </div>

        {/* Price */}
        <div className="absolute bottom-3 left-3">
          <div className="text-white font-bold text-xl">
            ₹{property.price.toLocaleString()}<span className="text-sm font-normal">/month</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-foreground font-semibold text-lg mb-2 line-clamp-2">
          {property.title}
        </h3>
        
        <div className="flex items-center text-muted-foreground mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{property.location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline">{property.rooms} Rooms</Badge>
          <Badge variant="outline">{property.occupancy}</Badge>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
          <Button size="sm" className="flex-1 bg-gradient-primary hover:opacity-90">
            Contact Owner
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
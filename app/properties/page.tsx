"use client"

import { useState, useEffect } from "react"
import { Container } from "@/components/ui/container"
import { Navbar } from "@/components/navbar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { getProperties } from "@/app/actions/properties"
import { Bed, Bath, Ruler, MapPin, Home, DollarSign, Calendar } from "lucide-react"
import { SellPropertyForm } from "@/components/sell-property-form"

export interface Property {
  id: string;
  title: string;
  price: number; // Price in Indian Rupees (₹)
  address: string;
  city: string;
  state: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  description: string;
  rental_yield_pct: number; // Annual rental yield percentage
  rental_yield_amount: number; // Annual rental yield in ₹
  lease_yield_pct: number; // Lease yield percentage
  lease_yield_amount: number; // Lease yield in ₹
  created_at: string;
  featured_image_url?: string;
  image_urls?: string[];
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        setProperties(data || []);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const openPropertyDialog = (property: Property) => {
    setSelectedProperty(property);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Properties</h1>
              <p className="text-gray-600 max-w-2xl">
                Browse through our exclusive selection of properties. Find your dream home or investment opportunity today.
              </p>
            </div>
            <SellPropertyForm />
          </div>
          {isLoading ? (
            <div className="col-span-full text-center py-12">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent"></div>
              <p className="mt-2">Loading properties...</p>
            </div>
          ) : properties.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No properties found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {properties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="h-60 bg-gray-200 relative">
                  <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                    For Sale
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                  <p className="text-2xl font-bold text-blue-600 mt-1">
                    ₹{property.price.toLocaleString('en-IN')}
                  </p>
                  <p className="text-gray-500 mt-1">{property.address}, {property.city}, {property.state}</p>
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Rental Yield:</span>
                      <span className="font-medium">
                        {property.rental_yield_pct}% (₹{property.rental_yield_amount.toLocaleString('en-IN')}/yr)
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Lease Yield:</span>
                      <span className="font-medium">
                        {property.lease_yield_pct}% (₹{property.lease_yield_amount.toLocaleString('en-IN')})
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4 text-gray-600 text-sm gap-4">
                    <span className="flex items-center">
                      <Bed className="w-4 h-4 mr-1" />
                      {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
                    </span>
                    <span className="flex items-center">
                      <Bath className="w-4 h-4 mr-1" />
                      {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
                    </span>
                    <span className="flex items-center">
                      <Ruler className="w-4 h-4 mr-1" />
                      {property.area_sqft.toLocaleString()} sqft
                    </span>
                  </div>
                  <Button 
                    onClick={() => openPropertyDialog(property)}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700"
                  >
                    View Details
                  </Button>
                </div>
              </div>
              ))}
            </div>
          )}
        </Container>
      </main>

      {/* Property Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedProperty && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{selectedProperty.title}</DialogTitle>
                <DialogDescription className="text-lg font-semibold text-blue-600">
                  ${selectedProperty.price.toLocaleString()}
                </DialogDescription>
              </DialogHeader>
              
              <div className="mt-4 space-y-4">
                <div className="h-64 bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  {selectedProperty.featured_image_url ? (
                    <img 
                      src={selectedProperty.featured_image_url} 
                      alt={selectedProperty.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400">No image available</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <Bed className="w-5 h-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-gray-500 text-sm">Bedrooms</p>
                      <p className="font-medium">{selectedProperty.bedrooms} {selectedProperty.bedrooms === 1 ? 'Bed' : 'Beds'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Bath className="w-5 h-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-gray-500 text-sm">Bathrooms</p>
                      <p className="font-medium">{selectedProperty.bathrooms} {selectedProperty.bathrooms === 1 ? 'Bath' : 'Baths'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Ruler className="w-5 h-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-gray-500 text-sm">Area</p>
                      <p className="font-medium">{selectedProperty.area_sqft.toLocaleString()} sqft</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 mr-3 text-gray-500" />
                    <div>
                      <p className="text-gray-500 text-sm">Location</p>
                      <p className="font-medium">{selectedProperty.city}, {selectedProperty.state}</p>
                    </div>
                  </div>
                  <div className="col-span-2 border-t pt-4 mt-2">
                    <p className="text-gray-500 mb-2 flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span>Rental Yield</span>
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-blue-600">{selectedProperty.rental_yield_pct}%</span>
                        <span className="ml-2 text-sm text-gray-500">annual</span>
                      </div>
                      <span className="text-gray-700 font-medium">
                        ₹{selectedProperty.rental_yield_amount.toLocaleString('en-IN')}/yr
                      </span>
                    </div>
                  </div>
                  <div className="col-span-2 border-t pt-4 mt-2">
                    <p className="text-gray-500 mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Lease Yield</span>
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-green-600">
                          {selectedProperty.lease_yield_pct}%
                        </span>
                      </div>
                      <span className="text-gray-700 font-medium">
                        ₹{selectedProperty.lease_yield_amount.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedProperty.description}</p>
                </div>
                
                <div className="flex justify-end pt-4">
                  <Button 
                    onClick={() => setIsDialogOpen(false)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

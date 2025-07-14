"use client"

import { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SellPropertyForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState<{
    // Contact Information
    name: string;
    email: string;
    phone: string;
    
    // Property Basic Info
    title: string;
    price: string;
    address: string;
    city: string;
    state: string;
    locality: string;
    propertyType: string;
    propertyAge: string;
    bedrooms: string;
    bathrooms: string;
    area_sqft: string;
    year_built: string;
    description: string;
    
    // Financial Information
    rental_yield_pct: string;
    rental_yield_amount: string;
    lease_yield_pct: string;
    lease_yield_amount: string;
    
    // Media
    images: File[];
  }>({
    // Contact Information
    name: "",
    email: "",
    phone: "",
    
    // Property Basic Info
    title: "",
    propertyType: "",
    address: "",
    city: "",
    state: "",
    locality: "",
    propertyAge: "",
    
    // Property Details
    bedrooms: "",
    bathrooms: "",
    area_sqft: "",
    year_built: "",
    
    // Pricing
    price: "",
    rental_yield_pct: "",
    rental_yield_amount: "",
    lease_yield_pct: "",
    lease_yield_amount: "",
    
    // Additional Info
    description: "",
    
    // Media
    images: [] as File[]
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Prepare the data to match the Property interface
    const propertyData = {
      title: formData.title,
      price: Number(formData.price),
      address: formData.address,
      city: formData.city,
      state: formData.state,
      bedrooms: Number(formData.bedrooms),
      bathrooms: Number(formData.bathrooms),
      area_sqft: Number(formData.area_sqft),
      description: formData.description,
      rental_yield_pct: Number(formData.rental_yield_pct) || 0,
      rental_yield_amount: Number(formData.rental_yield_amount) || 0,
      lease_yield_pct: Number(formData.lease_yield_pct) || 0,
      lease_yield_amount: Number(formData.lease_yield_amount) || 0,
      property_type: formData.propertyType,
      year_built: Number(formData.year_built),
      // Add other fields as needed
    }

    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit property');
      }

      // Handle successful submission
      console.log('Property submitted successfully:', await response.json());
      setIsOpen(false);
      // TODO: Show success message to user
    } catch (error) {
      console.error('Error submitting property:', error);
      // TODO: Show error message to user
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-600 hover:bg-green-700">Sell Your Property</Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">List Your Property for Sale</DialogTitle>
          <p className="text-sm text-center text-gray-500 mt-2">
            Please note we&apos;re not Magicbricks, we&apos;re a platform for property owners to list their properties for sale. We&apos;ll contact you if it suits our eligibility criteria.
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 p-2">
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4 pb-2 border-b">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 pb-2 border-b">Property Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Property Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Modern 3BHK Apartment in City Center"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value: string) => handleSelectChange("propertyType", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="house">Independent House</SelectItem>
                      <SelectItem value="plot">Plot/Land</SelectItem>
                      <SelectItem value="commercial">Commercial Property</SelectItem>
                      <SelectItem value="farmhouse">Farm House</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Complete Address *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Full street address"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 pb-2 border-b">Property Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Input
                    type="number"
                    id="bedrooms"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    min="0"
                    step="1"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <Input
                    type="number"
                    id="bathrooms"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    min="0"
                    step="0.5"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area_sqft">Area (sq ft) *</Label>
                  <Input
                    type="number"
                    id="area_sqft"
                    name="area_sqft"
                    value={formData.area_sqft}
                    onChange={handleChange}
                    min="0"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="year_built">Year Built *</Label>
                  <Input
                    type="number"
                    id="year_built"
                    name="year_built"
                    value={formData.year_built}
                    onChange={handleChange}
                    min="1800"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 pb-2 border-b">Pricing & Yields</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Asking Price (₹) *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                    <Input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="pl-8"
                      min="0"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rental_yield_pct">Expected Rental Yield (%)</Label>
                  <Input
                    type="number"
                    id="rental_yield_pct"
                    name="rental_yield_pct"
                    value={formData.rental_yield_pct}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rental_yield_amount">Expected Annual Rent (₹)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                    <Input
                      type="number"
                      id="rental_yield_amount"
                      name="rental_yield_amount"
                      value={formData.rental_yield_amount}
                      onChange={handleChange}
                      className="pl-8"
                      min="0"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lease_yield_pct">Lease Yield (%)</Label>
                  <Input
                    type="number"
                    id="lease_yield_pct"
                    name="lease_yield_pct"
                    value={formData.lease_yield_pct}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lease_yield_amount">Lease Yield Amount (₹)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                    <Input
                      type="number"
                      id="lease_yield_amount"
                      name="lease_yield_amount"
                      value={formData.lease_yield_amount}
                      onChange={handleChange}
                      className="pl-8"
                      min="0"
                    />
                  </div>
                </div>
              </div>
            </div>






            <div className="space-y-2">
              <Label htmlFor="description">Property Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                placeholder="Provide a detailed description of your property including key features, amenities, nearby facilities, and any other relevant information that would be valuable to potential buyers..."
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label>Property Images</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        accept="image/*"
                        // onChange={handleImageUpload}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="px-6"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 px-8"
            >
              List Property
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

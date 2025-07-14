"use client"

import { useState } from "react"
import { toast } from "@/components/ui/use-toast"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function WaitlistDialog() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    interest: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Here you would typically send the form data to your backend
      console.log('Form submitted:', formData)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Success!",
        description: "Thank you for joining the waitlist! We'll be in touch soon.",
        variant: "default",
      })
      
      setIsOpen(false)
      setFormData({ name: '', email: '', phone: '', interest: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: "There was an error submitting the form. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          size="lg" 
          className="group relative overflow-hidden px-8 py-6 text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20"
        >
          <span className="relative z-10">Join the Waitlist</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-900">Join Our Waitlist</DialogTitle>
          <DialogDescription className="text-slate-600">
            Be the first to know when we launch. We&apos;ll keep you updated on exclusive investment opportunities.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Mobile Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="interest">I&apos;m interested in</Label>
            <Select 
              name="interest"
              value={formData.interest}
              onValueChange={(value) => setFormData(prev => ({ ...prev, interest: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buy">Buying a property</SelectItem>
                <SelectItem value="sell">Selling a property</SelectItem>
                <SelectItem value="both">Both buying and selling</SelectItem>
                <SelectItem value="invest">Investing in properties</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="mt-4" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Join Waitlist'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

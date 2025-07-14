"use client"

import { useState } from "react"
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

type ToastProps = {
  title: string;
  description: string;
  variant?: 'default' | 'destructive';
};

const Toast = ({ title, description, variant = 'default' }: ToastProps) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg ${
      variant === 'destructive' ? 'bg-red-500 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-1">
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

let toastId = 0;

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
      setIsOpen(false)
      setFormData({ name: '', email: '', phone: '', interest: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
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

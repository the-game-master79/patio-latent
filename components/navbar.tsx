"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "./ui/button"
import { Container } from "./ui/container"

export function Navbar() {
  const pathname = usePathname()
  const isPropertiesPage = pathname === '/properties'
  
  return (
    <header className="fixed w-full z-50 transition-all duration-300 bg-white/90 backdrop-blur-md shadow-sm py-4">
        <Container>
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Patio Latent
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="#how-it-works" 
                className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                How It Works
              </Link>
              <Link 
                href="#benefits" 
                className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Benefits
              </Link>
              <Link 
                href="#faq" 
                className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                FAQ
              </Link>
              {!isPropertiesPage && (
                <Link href="/properties">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">View Properties</Button>
                </Link>
              )}
            </div>
            <button className="md:hidden text-slate-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
        </Container>
    </header>
  )
}

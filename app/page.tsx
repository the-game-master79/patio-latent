"use client"

import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Navbar } from "@/components/navbar"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Shield, TrendingUp, Home as HomeIcon, Search, Gavel, Handshake, FileText, Phone, MessageSquare, MapPin, Clock, Award, ChevronDown } from "lucide-react"
import { WaitlistDialog } from "@/components/waitlist-dialog"
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar />

      {/* Hero Section */}
      <motion.section 
        ref={targetRef}
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 pt-20 pb-32 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <Container>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
            className="relative z-10 mx-auto max-w-4xl text-center px-4 sm:px-6 lg:px-8"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mb-6">
              <span>🚀</span>
              <span>Join 10,000+ investors already earning with us</span>
            </motion.div>
            
            <motion.h1 variants={fadeIn} className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
              India's Premier Platform for <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text">Distressed Real Estate</span>
            </motion.h1>
            
            <motion.p variants={fadeIn} className="mt-6 text-xl leading-8 text-slate-600 max-w-3xl mx-auto">
              Unlock exclusive access to high-ROI investment opportunities in court-auctioned and NPA properties, backed by comprehensive legal verification and flexible co-investment options.
            </motion.p>
            
            <motion.div variants={fadeIn} className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <WaitlistDialog />
              <Button 
                size="lg" 
                variant="outline" 
                className="group relative overflow-hidden px-8 py-6 text-lg font-medium border-2 border-slate-200 hover:border-blue-500 transition-all duration-300"
                onClick={() => {
                  document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="relative z-10">How It Works</span>
                <ChevronDown className="ml-2 h-5 w-5 transition-transform group-hover:translate-y-0.5" />
              </Button>
            </motion.div>
            
            <motion.div variants={fadeIn} className="mt-16 relative">
              <div className="absolute -inset-4">
                <div className="w-full h-full mx-auto opacity-30 blur-lg filter" style={{
                  background: 'linear-gradient(90deg, #3b82f6 0%, #06b6d4 100%)',
                }}></div>
              </div>
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="p-1 bg-gradient-to-r from-blue-600 to-cyan-500">
                  <div className="flex space-x-2 p-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="aspect-video bg-slate-100 rounded-lg flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-5xl mb-4">🏡</div>
                      <p className="text-slate-500">Property showcase will appear here</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </Container>
        
        <motion.div 
          style={{ y }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-400 animate-bounce"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative py-24 bg-white overflow-hidden scroll-mt-20">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-blue-50 to-transparent"></div>
        <Container>
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center"
          >
            <span className="inline-block px-3 py-1 text-sm font-medium text-blue-700 bg-blue-100 rounded-full mb-4">Our Process</span>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Simple, Transparent Process
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-xl text-slate-600">
              Our streamlined 4-step process makes investing in distressed properties simple and secure.
            </p>
            
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <Search className="h-8 w-8 text-blue-600" />,
                  title: "1. Property Discovery",
                  description: "Our AI-powered platform scans thousands of court-auctioned and NPA properties across India to find the most promising opportunities.",
                  color: "from-blue-100 to-blue-50"
                },
                {
                  icon: <FileText className="h-8 w-8 text-cyan-600" />,
                  title: "2. Legal Verification",
                  description: "Our team of legal experts conducts thorough due diligence to verify property titles, clearances, and legal status.",
                  color: "from-cyan-100 to-cyan-50"
                },
                {
                  icon: <Gavel className="h-8 w-8 text-indigo-600" />,
                  title: "3. Bidding & Acquisition",
                  description: "We handle the entire auction process, from initial bid to successful acquisition, ensuring you get the best possible deal.",
                  color: "from-indigo-100 to-indigo-50"
                },
                {
                  icon: <Handshake className="h-8 w-8 text-emerald-600" />,
                  title: "4. Co-Investment",
                  description: "Invest as little as ₹10 lakhs alongside other investors to own a share of high-value properties with exceptional returns.",
                  color: "from-emerald-100 to-emerald-50"
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className={`absolute -z-10 h-48 w-48 rounded-full bg-gradient-to-br ${item.color} opacity-50 blur-3xl`}></div>
                  <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} mb-6 text-white`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-slate-600">{item.description}</p>
                  <div className="mt-6 flex items-center text-sm font-medium text-blue-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    Learn more
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-16 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 p-0.5">
              <div className="flex flex-col items-center justify-between rounded-2xl bg-white p-8 text-center sm:flex-row sm:text-left">
                <div className="max-w-2xl">
                  <h3 className="text-2xl font-bold text-slate-900">Ready to get started?</h3>
                  <p className="mt-2 text-slate-600">Join thousands of investors who are already building wealth through distressed real estate investments with Patio Latent.</p>
                </div>
                <Button size="lg" className="mt-6 sm:mt-0 group relative overflow-hidden px-8 py-6 text-lg font-medium transition-all duration-300">
                  <span className="relative z-10">Start Investing Today</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </div>
            </div>
          </motion.div>
        </Container>
        
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Why Choose Us Section */}
      <section id="benefits" className="py-20 scroll-mt-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Why Choose Patio Latent
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              We make distressed real estate investing accessible, transparent, and profitable.
            </p>
            
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: <Shield className="h-8 w-8 text-blue-600" />,
                  title: "100% Legal Assurance",
                  description: "Every property undergoes rigorous legal verification by our expert team."
                },
                {
                  icon: <TrendingUp className="h-8 w-8 text-blue-600" />,
                  title: "High ROI Potential",
                  description: "Average returns of 18-25% annually through capital appreciation and rental income."
                },
                {
                  icon: <HomeIcon className="h-8 w-8 text-blue-600" />,
                  title: "Diversified Portfolio",
                  description: "Invest across different property types and locations with a single platform."
                },
                {
                  icon: <Clock className="h-8 w-8 text-blue-600" />,
                  title: "Time-Saving",
                  description: "We handle everything from discovery to documentation, saving you hundreds of hours."
                },
                {
                  icon: <MapPin className="h-8 w-8 text-blue-600" />,
                  title: "Pan-India Presence",
                  description: "Access to properties across major Indian cities and emerging markets."
                },
                {
                  icon: <Award className="h-8 w-8 text-blue-600" />,
                  title: "Expert Team",
                  description: "Backed by industry veterans with decades of experience in real estate and law."
                }
              ].map((item, index) => (
                <div key={index} className="rounded-xl border border-slate-100 p-6 text-left">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
                    {item.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Property Showcase */}
      <section id="properties" className="bg-slate-50 py-20 scroll-mt-20">
        <Container>
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Featured Properties
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Handpicked investment opportunities with high growth potential
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                location: "Bandra West, Mumbai",
                price: "₹2.8 Cr",
                area: "1200 sq.ft",
                type: "3 BHK Apartment",
                roi: "22% Expected ROI",
                status: "Auction: 15 Aug 2023"
              },
              {
                location: "Jubilee Hills, Hyderabad",
                price: "₹4.2 Cr",
                area: "2800 sq.ft",
                type: "4 BHK Villa",
                roi: "25% Expected ROI",
                status: "Pre-Auction"
              },
              {
                location: "Koramangala, Bangalore",
                price: "₹3.5 Cr",
                area: "1800 sq.ft",
                type: "4 BHK Apartment",
                roi: "20% Expected ROI",
                status: "Documentation in Progress"
              }
            ].map((property, index) => (
              <div key={index} className="overflow-hidden rounded-xl bg-white shadow-lg">
                <div className="h-48 bg-slate-200"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900">{property.location}</h3>
                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500">Price</p>
                      <p className="font-medium">{property.price}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Area</p>
                      <p className="font-medium">{property.area}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">Type</p>
                      <p className="font-medium">{property.type}</p>
                    </div>
                    <div>
                      <p className="text-slate-500">ROI</p>
                      <p className="font-medium text-green-600">{property.roi}</p>
                    </div>
                  </div>
                  <div className="mt-4 border-t border-slate-100 pt-4">
                    <p className="text-sm font-medium text-blue-600">{property.status}</p>
                    <Button className="mt-4 w-full" size="lg">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">View All Properties</Button>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 scroll-mt-20 bg-white">
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Everything you need to know about investing with Patio Latent.
              </p>
            </div>
            
            <div className="mt-12">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  {
                    question: "What is distressed real estate?",
                    answer: "Distressed real estate refers to properties that are under foreclosure, bank-owned, or being sold at auction due to the owner's inability to meet financial obligations. These properties are often available below market value, presenting excellent investment opportunities."
                  },
                  {
                    question: "What is the minimum investment amount?",
                    answer: "Our co-investment model allows you to start with as little as ₹10 lakhs. This makes high-value distressed property investments accessible to a wider range of investors."
                  },
                  {
                    question: "How do you ensure the legal safety of properties?",
                    answer: "Each property undergoes a rigorous 120-point legal verification process by our team of experienced real estate attorneys. We verify title documents, encumbrances, litigation history, and all necessary clearances before presenting any opportunity to our investors."
                  },
                  {
                    question: "What kind of returns can I expect?",
                    answer: "While past performance doesn't guarantee future results, our historical data shows average annual returns between 18-25% through a combination of capital appreciation and rental income. Returns vary by property and market conditions."
                  },
                  {
                    question: "How does the co-investment model work?",
                    answer: "Our co-investment model allows multiple investors to pool their resources to acquire high-value properties. Each investor owns a percentage share of the property proportional to their investment. We handle all aspects of property management and distribution of returns."
                  }
                ].map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 px-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <AccordionTrigger className="py-4 text-left text-lg font-semibold text-slate-900 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-0 text-slate-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-slate-600">Still have questions?</p>
              <Button 
                variant="link" 
                className="mt-2 text-blue-600 hover:no-underline group"
                onClick={() => {
                  document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <MessageSquare className="mr-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" /> Contact our support team
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section id="cta" className="bg-blue-700 py-20 scroll-mt-20">
        <Container>
          <div className="mx-auto max-w-4xl text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Start Investing in Distressed Properties?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
              Join our exclusive waitlist today and get early access to the best investment opportunities in India's distressed real estate market.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button className="bg-white text-blue-700 hover:bg-blue-50" size="lg">
                Join Waitlist
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-blue-600 hover:text-white" size="lg">
                <Phone className="mr-2 h-4 w-4" /> Schedule a Call
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}

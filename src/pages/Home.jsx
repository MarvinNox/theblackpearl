import React from 'react';
import Header from '../components/landing/Header';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import ServicesSection from '../components/landing/ServicesSection';
import PortfolioSection from '../components/landing/PortfolioSection';
import MapSection from '../components/landing/MapSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import TeamSection from '../components/landing/TeamSection';
import PricingSection from '../components/landing/PricingSection';
import ProcessSection from '../components/landing/ProcessSection';
import ContactSection from '../components/landing/ContactSection';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <main className="bg-void min-h-screen">
      <Header />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <MapSection />
      <TestimonialsSection />
      <TeamSection />
      <PricingSection />
      <ProcessSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
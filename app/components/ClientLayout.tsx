'use client'

import dynamic from 'next/dynamic';

const Background3D = dynamic(() => import('./Background3D'), { ssr: false });
const Navbar = dynamic(() => import('./NavBar'), { ssr: false });
const Hero = dynamic(() => import('./Hero'), { ssr: false });
const ServicesSection = dynamic(() => import('./ServicesSection'), { ssr: false });
const AboutSection = dynamic(() => import('./AboutSection'), { ssr: false });
const ExperienceSection = dynamic(() => import('./ExperienceSection'), { ssr: false });
const ProjectsSection = dynamic(() => import('./ProjectsSection'), { ssr: false });
const ContactSection = dynamic(() => import('./ContactSection'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });
export default function ClientLayout() {
  return (
    <>
      <Background3D />
      <Navbar />
      <Hero />
      <ServicesSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </>
  );
}
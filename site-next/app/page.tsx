import Navbar from '@/components/Navbar';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import StackAnimation from '@/components/StackAnimation';
import Section1Hero from '@/components/Section1Hero';
import Section2Gallery from '@/components/Section2Gallery';
import SectionAbout from '@/components/SectionAbout';
import Section3ServicesGrid from '@/components/Section3ServicesGrid';
import Section4Showreel from '@/components/Section4Showreel';
import Section3Work from '@/components/Section3Work';
import Section8Contact from '@/components/Section8Contact';
import Section7Pricing from '@/components/Section7Pricing';
import SectionContactForm from '@/components/SectionContactForm';
import SectionFooter from '@/components/SectionFooter';

export default function Home() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <StackAnimation />
      <Navbar />
      <Section1Hero />
      <Section2Gallery />
      <SectionAbout />
      <Section3ServicesGrid />
      <Section4Showreel />
      <Section3Work />
      <Section8Contact />
      <Section7Pricing />
      <SectionContactForm />
      <SectionFooter />
    </>
  );
}

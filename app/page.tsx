import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import SocialProofTicker from '@/components/SocialProofTicker';
import CollectionGrid from '@/components/CollectionGrid';
import AboutSection from '@/components/AboutSection';
import Testimonials from '@/components/Testimonials';
import FaqSection from '@/components/FaqSection';
import OrderForm from '@/components/OrderForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SocialProofTicker />
      <CollectionGrid />
      <AboutSection />
      <Testimonials />
      <FaqSection />
      <OrderForm />
      <Footer />
    </main>
  );
}

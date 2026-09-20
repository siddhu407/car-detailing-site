import { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Booking from '@/components/Booking';
import Reviews from '@/components/Reviews';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import CheckoutModal from '@/components/CheckoutModal';
import OwnerLoginModal from '@/components/OwnerLoginModal';
import OwnerDashboard from '@/components/OwnerDashboard';
import NotFound from '@/components/NotFound';

function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [ownerLoginOpen, setOwnerLoginOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [notFound] = useState(false);

  if (notFound) {
    return <NotFound />;
  }

  return (
    <CartProvider>
      <Navbar onOwnerLogin={() => setOwnerLoginOpen(true)} />

      <main>
        <Hero />
        <Services />
        <Booking />
        <Reviews />
      </main>

      <Footer onOwnerLogin={() => setOwnerLoginOpen(true)} />

      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      <OwnerLoginModal
        isOpen={ownerLoginOpen}
        onClose={() => setOwnerLoginOpen(false)}
        onSuccess={() => {
          setOwnerLoginOpen(false);
          setDashboardOpen(true);
        }}
      />
      <OwnerDashboard isOpen={dashboardOpen} onClose={() => setDashboardOpen(false)} />
    </CartProvider>
  );
}

export default App;

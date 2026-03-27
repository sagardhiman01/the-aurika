import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/CartSidebar';

export const metadata = {
  title: 'THE AURIKA | Find Your Spark - Luxury Jewelry',
  description: 'Discover exquisite handcrafted jewelry at THE AURIKA. Premium gold, diamond & pearl collections. Find Your Spark with our curated jewelry pieces. Shop necklaces, rings, earrings, bracelets & more.',
  keywords: 'jewelry, gold jewelry, diamond rings, pearl earrings, luxury jewelry, THE AURIKA, Dehradun jewelry, Indian jewelry, bridal jewelry',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <CartSidebar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

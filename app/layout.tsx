import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import NextTopLoader from 'nextjs-toploader';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create a Chatbot',
  description: 'Create a Chatbot',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextTopLoader color="#db4a2b" />
        <Navbar />
        <div className='w-full flex justify-center mt-5'>
          <div className='max-w-screen-lg px-5 w-full'>
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}

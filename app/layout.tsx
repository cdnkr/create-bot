import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

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
      <NextTopLoader color="#3b82f6" />
      <body className={inter.className}>
        <Navbar />
        <div className='w-full flex justify-center mt-5'>
          <div className='max-w-screen-lg px-5 w-full'>
            <main className="flex flex-col items-center justify-between">
              {children}
            </main>
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}

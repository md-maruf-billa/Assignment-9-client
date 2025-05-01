import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="bg-gradient-to-br from-[#f8f9fa] via-[#f1f3f5] to-[#e9ecef] min-h-screen">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </div>
    </>
  );
}

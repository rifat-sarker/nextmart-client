import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function CommonLayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen"> {children}</main>
      <Footer />
    </>
  );
}

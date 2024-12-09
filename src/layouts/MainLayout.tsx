import Navbar from "@/components/Navbar";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <main className="flex justify-center items-center min-h-screen">
        {children}
      </main>
    </>
  );
}

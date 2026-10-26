import { Clinics } from "@/app/(public)/_components/clinics";
import { Footer } from "@/app/(public)/_components/footer";
import { Header } from "@/app/(public)/_components/header";
import { Hero } from "@/app/(public)/_components/hero";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <Hero />
        <Clinics />
      </main>
      <Footer />
    </div>
  );
}

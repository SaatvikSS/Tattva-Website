import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Scrollytelling } from "@/components/scrollytelling"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#08080C] overflow-x-hidden">
      <Navbar />
      <Hero />
      <Scrollytelling />
      <Features />
      <Footer />
    </main>
  )
}

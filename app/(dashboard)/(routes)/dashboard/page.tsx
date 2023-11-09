import Hero from "@/components/dashboard/hero"
import Navbar from "@/components/dashboard/navbar"

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full overflow-hidden transition-all duration-500">
      <Navbar />
      <Hero />
    </div>
  )
}

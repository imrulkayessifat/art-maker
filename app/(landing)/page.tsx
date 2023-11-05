// "use client";

import Navbar from '@/components/navbar'
import { Social } from '@/components/social'
import Info from '@/components/info'
import General from '@/components/general'
import VideoSection from '@/components/videosection'
import Tools from '@/components/tools'
import ImageSlider from '@/components/imageslider'
import Profile from '@/components/profile'
import Footer from '@/components/footer'

export default function Landing() {
  
  return (
    <>
      {/* navbar */}
      <Navbar />

      {/* general */}
      <General />

      <VideoSection />

      <Tools />

      <ImageSlider />

      <Profile />

      <Footer />

      <Social />
      <Info />
      
    </>
  )
}

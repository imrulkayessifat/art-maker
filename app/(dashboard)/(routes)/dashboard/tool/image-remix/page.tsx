import Image from "next/image"
import Link from "next/link"

import Hero from "@/components/dashboard/hero"
import Navbar from "@/components/dashboard/navbar"
import ImageRemix from "@/components/dashboard/image_remix"
export default function Home() {
  return (
    <div className="flex flex-col w-full max-h-screen transition-all duration-500">
      <div className="hidden md:block">
        <Navbar />
        <Hero HeroLeft={<ImageRemix />} />
      </div>
      <div className="flex flex-col gap-3 w-full h-screen items-center justify-center md:hidden">
        <Image
          src="https://s3.us-east-1.wasabisys.com/imagine-frontend/gif/imagine-logo.gif"
          alt="Imagine logo"
          width={"100"}
          height={"100"}
          className="rounded-lg border-2"
        />
        <p className="text-center text-[18px] font-semibold leading-7 text-neutral-0">
          Imagine web is only available on desktop.<br /> Sign in from your desktop to use Imagine web.
        </p>
        <div className="mt-2.5 flex gap-3">
          <Link className="border-2 rounded-lg" href="https://apps.apple.com/us/app/imagine-art-creator/id1664121419" target="_blank" rel="noreferrer">
            <Image
              src="https://cdn1.imagine.art/imagine-dashboard/assets/images/app-store-cta.svg"
              alt="App Store CTA"
              width={"200"}
              height={"100"}
            />
          </Link>
          <Link className="border-2 rounded-lg" href="https://play.google.com/store/apps/details?id=com.vyroai.aiart" target="_blank" rel="noreferrer">
            <Image
              src="https://cdn1.imagine.art/imagine-dashboard/assets/images/play-store-cta.svg"
              alt="Play Store CTA"
              width={"200"}
              height={"100"}
            />
          </Link>
        </div>
      </div >
    </div >
  )
}

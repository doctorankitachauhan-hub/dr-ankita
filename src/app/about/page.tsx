import AboutDesc from '@/components/AboutDesc'
import AboutPageStrip from '@/components/AboutPageStrip'
import OurMission from '@/components/OurMission'
import React from 'react'

export default function AboutPage() {
  return (
    <main className='relative w-full'>
      <AboutDesc />
      <AboutPageStrip />
      <OurMission />
    </main>
  )
}

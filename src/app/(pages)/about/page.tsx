import AboutDesc, { OtherData } from '@/components/AboutDesc'
import AboutPageStrip from '@/components/AboutPageStrip'
import Academic from '@/components/Academic'
import OurMission from '@/components/OurMission'
import React from 'react'

export default function AboutPage() {
  return (
    <main className='relative w-full'>
      <AboutDesc />
      <AboutPageStrip />
      <Academic />
      <OtherData />
    </main>
  )
}

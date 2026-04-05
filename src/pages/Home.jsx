import Hero from '../components/sections/Hero'
import WhyCasita from '../components/sections/WhyCasita'
import GuestsGallery from '../components/sections/GuestsGallery'
import DailyRoutine from '../components/sections/DailyRoutine'
import Services from '../components/sections/Services'
import Testimonials from '../components/sections/Testimonials'
import LucaStory from '../components/sections/LucaStory'
import BookingCTA from '../components/sections/BookingCTA'
import InstagramFeed from '../components/sections/InstagramFeed'

export default function Home() {
  return (
    <>
      <Hero />
      <WhyCasita />
      <GuestsGallery />
      <DailyRoutine />
      <Services />
      <Testimonials />
      <LucaStory />
      <BookingCTA />
      <InstagramFeed />
    </>
  )
}

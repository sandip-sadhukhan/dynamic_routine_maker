import { Divider } from "@chakra-ui/react"
import type { NextPage } from "next"
import HeroSection from "../components/home/hero-section"
import Navbar from "../components/navbar"

const Home: NextPage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Divider />
    </>
  )
}

export default Home

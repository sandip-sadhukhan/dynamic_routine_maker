import { Divider, useDisclosure } from "@chakra-ui/react"
import type { NextPage } from "next"
import About from "../components/home/about"
import Footer from "../components/home/footer"
import HeroSection from "../components/home/hero-section"
import HowToUse from "../components/home/how-to-use"
import LoginModal from "../components/home/login-modal"
import SignUpModal from "../components/home/signup-modal"
import Navbar from "../components/home/navbar"

const Home: NextPage = () => {
  const {
    isOpen: signUpIsOpen,
    onOpen: signUpOnOpen,
    onClose: signUpOnClose,
  } = useDisclosure()

  const {
    isOpen: loginIsOpen,
    onOpen: loginOnOpen,
    onClose: loginOnClose,
  } = useDisclosure()

  return (
    <>
      <Navbar
        loginOnOpen={loginOnOpen}
        signUpOnOpen={signUpOnOpen}
      />
      <HeroSection
        loginOnOpen={loginOnOpen}
        signUpOnOpen={signUpOnOpen}
      />
      <Divider />
      <HowToUse />
      <Divider />
      <About />
      <Footer />
      <SignUpModal
        isOpen={signUpIsOpen}
        onClose={signUpOnClose}
      />
      <LoginModal
        isOpen={loginIsOpen}
        onClose={loginOnClose}
      />
    </>
  )
}

export default Home

import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import Image from "next/image"
import Link from "next/link"
import { HamburgerIcon } from "@chakra-ui/icons"
import React from "react"

interface NavbarProps {
  loginOnOpen?: () => void
  signUpOnOpen?: () => void
}

const Navbar: React.FC<NavbarProps> = (
  props: NavbarProps
) => {
  const { colorMode, toggleColorMode } = useColorMode()
  const navbarBg = useColorModeValue("gray.50", "gray.700")
  const { loginOnOpen, signUpOnOpen } = props
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box
        as="nav"
        w="full"
        boxShadow="base"
        py={2}
        bg={navbarBg}
        position="sticky"
        top="0"
        zIndex={10}
      >
        <Container maxW="container.xl" centerContent>
          <HStack w="full" justifyContent="space-between">
            <Link href="/" passHref>
              <HStack cursor="pointer">
                <Image
                  width={30}
                  height={30}
                  src="/favicon.png"
                  alt="Logo"
                />
                <Heading
                  as="h3"
                  size="md"
                  colorScheme="messenger"
                  fontSize={{ base: "md", md: "lg" }}
                >
                  Dynamic Routine Maker
                </Heading>
              </HStack>
            </Link>
            <HStack
              spacing={6}
              display={{ base: "none", md: "flex" }}
            >
              <Button variant="link">
                <Link href="/#home" passHref>
                  Home
                </Link>
              </Button>
              <Button variant="link">
                <Link href="/#how-it-works" passHref>
                  How it works
                </Link>
              </Button>
              <Button variant="link">
                <Link href="/#about-me" passHref>
                  About me
                </Link>
              </Button>
              <Button
                colorScheme="messenger"
                size="sm"
                onClick={loginOnOpen}
              >
                Login
              </Button>
              <Button
                colorScheme="messenger"
                variant="outline"
                size="sm"
                onClick={signUpOnOpen}
              >
                SignUp
              </Button>
              <IconButton
                variant="ghost"
                icon={
                  colorMode === "light" ? (
                    <MoonIcon />
                  ) : (
                    <SunIcon />
                  )
                }
                aria-label="Theme Toggle"
                onClick={toggleColorMode}
              />
            </HStack>
            <HStack display={{ base: "flex", md: "none" }}>
              <IconButton
                variant="ghost"
                aria-label="Options"
                icon={<HamburgerIcon />}
                onClick={onOpen}
              />
            </HStack>
          </HStack>
        </Container>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        autoFocus={false}
        returnFocusOnClose={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <VStack spacing={6}>
              <Button variant="link">
                <Link href="/#home" passHref>
                  Home
                </Link>
              </Button>
              <Button variant="link">
                <Link href="/#how-it-works" passHref>
                  How it works
                </Link>
              </Button>
              <Button variant="link">
                <Link href="/#about-me" passHref>
                  About me
                </Link>
              </Button>
              <Button
                colorScheme="messenger"
                size="sm"
                onClick={loginOnOpen}
              >
                Login
              </Button>
              <Button
                colorScheme="messenger"
                variant="outline"
                size="sm"
                onClick={signUpOnOpen}
              >
                SignUp
              </Button>
              <IconButton
                variant="ghost"
                icon={
                  colorMode === "light" ? (
                    <MoonIcon />
                  ) : (
                    <SunIcon />
                  )
                }
                aria-label="Theme Toggle"
                onClick={toggleColorMode}
              />
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Navbar

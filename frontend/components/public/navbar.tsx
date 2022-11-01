import {
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  useColorMode,
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from "@chakra-ui/icons"
import React from "react"

interface NavbarProps {
  text: string
}

const Navbar: React.FC<NavbarProps> = ({ text }) => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Box
        as="nav"
        w="full"
        boxShadow="base"
        py={2}
        bgColor="messenger.500"
      >
        <Container maxW="container.xl" centerContent>
          <HStack justifyContent="center" w="full">
            <Heading
              as="h3"
              size="md"
              fontSize={{ base: "lg", md: "2xl" }}
              color="white"
            >
              {text}
            </Heading>
            <IconButton
              variant="ghost"
              icon={
                colorMode === "light" ? (
                  <MoonIcon color="white" />
                ) : (
                  <SunIcon color="white" />
                )
              }
              aria-label="Theme Toggle"
              onClick={toggleColorMode}
            />
          </HStack>
        </Container>
      </Box>
    </>
  )
}

export default Navbar

import {
  Box,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import Image from "next/image"
import React from "react"

interface HowToUseBoxProps {
  title: string
  body: string
  image: string
}

const HowToUseBox: React.FC<HowToUseBoxProps> = ({
  title,
  body,
  image,
}) => {
  const boxBg = useColorModeValue("blue.50", "gray.700")

  return (
    <Box shadow="base" bg={boxBg} p={10} rounded="base">
      <Image
        src={image}
        alt={title}
        height="200px"
        width="300px"
      />
      <Heading
        as="h3"
        fontSize="2xl"
        textAlign="center"
        my={4}
      >
        {title}
      </Heading>
      <Text textAlign="justify" color="gray.500">
        {body}
      </Text>
    </Box>
  )
}

export default HowToUseBox

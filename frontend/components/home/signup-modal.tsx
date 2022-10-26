import {
  Button,
  Input,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react"
import React from "react"

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
}

const SignUpModal: React.FC<SignUpModalProps> = (
  props: SignUpModalProps
) => {
  const { isOpen, onClose } = props
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>SignUp</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftAddon children="Email" />
              <Input
                type="email"
                placeholder="Enter your email"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Password" />
              <Input type="password" />
            </InputGroup>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="solid" colorScheme="messenger">
            SignUp
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SignUpModal

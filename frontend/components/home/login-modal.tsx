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

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = (
  props: LoginModalProps
) => {
  const { isOpen, onClose } = props
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
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
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default LoginModal

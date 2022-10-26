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
import { useRouter } from "next/router"
import React from "react"
import { useForm } from "react-hook-form"
import client from "../../constants/apollo-client"
import useLoginUser from "../../hooks/useLoginUser"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

const LoginModal: React.FC<LoginModalProps> = (
  props: LoginModalProps
) => {
  const { isOpen, onClose } = props
  const router = useRouter()

  interface IFormData {
    email: string
    password: string
  }

  const { register, handleSubmit } = useForm<IFormData>()
  const [loginUser] = useLoginUser()

  const onSubmit = async (formData: IFormData) => {
    try {
      const token = await loginUser({
        variables: { ...formData },
      })
      if (token.data?.tokenAuth.token) {
        localStorage.setItem(
          "token",
          token.data.tokenAuth.token
        )
      }
      client.refetchQueries({ include: "active" })
      router.push("/dashboard")
    } catch {}
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <InputGroup>
              <InputLeftAddon children="Email" />
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                required
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Password" />
              <Input
                type="password"
                {...register("password")}
                required
              />
            </InputGroup>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="solid"
            colorScheme="messenger"
            type="submit"
          >
            Login
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default LoginModal

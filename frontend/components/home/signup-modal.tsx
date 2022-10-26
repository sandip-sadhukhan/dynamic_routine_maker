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
import useCreateUser from "../../hooks/useCreateUser"
import useLoginUser from "../../hooks/useLoginUser"

interface SignUpModalProps {
  isOpen: boolean
  onClose: () => void
}

const SignUpModal: React.FC<SignUpModalProps> = (
  props: SignUpModalProps
) => {
  const { isOpen, onClose } = props
  const router = useRouter()

  interface IFormData {
    email: string
    password: string
  }

  const { register, handleSubmit } = useForm<IFormData>()
  const [createUser, { loading: signUpLoading }] =
    useCreateUser()
  const [loginUser, { loading: loginLoading }] =
    useLoginUser()

  const onSubmit = async (formData: IFormData) => {
    try {
      await createUser({
        variables: { ...formData },
      })

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
        <ModalHeader>SignUp</ModalHeader>
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
                minLength={6}
              />
            </InputGroup>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            type="submit"
            variant="solid"
            colorScheme="messenger"
            isLoading={signUpLoading || loginLoading}
            loadingText="Signing Up"
          >
            SignUp
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SignUpModal

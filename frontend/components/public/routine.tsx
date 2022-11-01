import {
  Alert,
  AlertIcon,
  AlertTitle,
  Container,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import React from "react"
import { IClass } from "../../hooks/useGetPublicRoutine"
import RoutineRow from "./routine-row"

interface RoutineProps {
  schedules: IClass[]
}

const Routine: React.FC<RoutineProps> = ({ schedules }) => {
  return (
    <Container
      maxW="container.lg"
      centerContent
      minH="70vh"
    >
      {schedules.length === 0 && (
        <Alert status="info" justifyContent="center">
          <AlertIcon />
          <AlertTitle>
            Hurrah! Today is Holiday 😺
          </AlertTitle>
        </Alert>
      )}
      {schedules.length > 0 && (
        <TableContainer py={10} w="full">
          <Table
            variant="striped"
            size={{ base: "sm", md: "md" }}
          >
            <Thead>
              <Tr>
                <Th textAlign="center">Period</Th>
                <Th textAlign="center">Time</Th>
                <Th textAlign="center">Subject</Th>
              </Tr>
            </Thead>
            <Tbody>
              {schedules.map((classObj, index) => (
                <RoutineRow
                  key={classObj.id}
                  classObj={classObj}
                  period={index + 1}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Container>
  )
}

export default Routine

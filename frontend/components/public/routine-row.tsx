import { Td, Text, Tr, VStack } from "@chakra-ui/react"
import React from "react"
import timeFormatter from "../../helpers/timeFormatter"
import { IClass } from "../../hooks/useGetPublicRoutine"

interface RoutineRowProps {
  classObj: IClass
  period: number
}

const RoutineRow: React.FC<RoutineRowProps> = ({
  classObj,
  period,
}) => {
  return (
    <Tr>
      <Td textAlign="center">{period}</Td>
      {/* TODO: Make the time 12hour */}
      <Td textAlign="center">
        {timeFormatter(classObj.startTime)} -{" "}
        {timeFormatter(classObj.endTime)}
      </Td>
      <Td textAlign="center">
        <VStack>
          <Text>{classObj.subject}</Text>
          <Text>({classObj.teacherShortName})</Text>
        </VStack>
      </Td>
    </Tr>
  )
}

export default RoutineRow

import { VStack } from "@chakra-ui/react"
import type {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next"
import Head from "next/head"
import NotFound from "../../components/not-found"
import Footer from "../../components/public/footer"
import Navbar from "../../components/public/navbar"
import Routine from "../../components/public/routine"
import useGetAllPublicRoutines from "../../hooks/useGetAllPublicRoutines"
import useGetPublicRoutine, {
  IClass,
  IData,
} from "../../hooks/useGetPublicRoutine"

interface PublicRoutineProps {
  data: { data: IData } | null
}

const PublicRoutine: NextPage<PublicRoutineProps> = ({
  data,
}) => {
  if (!data) {
    return <NotFound />
  }

  const routine = data.data.publicRoutine
  const today = new Date()
  const todayWeekday = today.getDay()
  const DayToStringList = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ]

  const todayString = DayToStringList[todayWeekday]
  let schedules: IClass[] = (routine.allClasses as any)[
    todayString
  ]

  schedules = schedules.filter((schedule) => {
    const hour = schedule.endTime.split(":")[0]
    const minute = schedule.endTime.split(":")[1]
    const timeInMinute =
      parseInt(hour) * 60 + parseInt(minute)

    const todayInMinute =
      today.getHours() * 60 + today.getMinutes()

    return timeInMinute >= todayInMinute
  })

  return (
    <>
      <Head>
        <title>
          {`${routine.name} | Dynamic Routine Maker`}
        </title>
      </Head>
      <VStack w="full">
        <Navbar text="Upcoming Classes" />
        <Routine schedules={schedules} />
        <Footer />
      </VStack>
    </>
  )
}

export const getStaticProps: GetStaticProps = async (
  context
) => {
  const slug = context.params?.slug as string

  let data

  try {
    data = await useGetPublicRoutine(slug)
  } catch {}

  return {
    props: {
      data: data || null,
    },
    revalidate: 10, // remove this line when you use revalidate
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await useGetAllPublicRoutines()

  // Get the paths we want to pre-render based on posts
  const paths =
    res.data?.allPublicRoutines.map((routine) => ({
      params: { slug: routine.slug },
    })) || []

  return { paths, fallback: "blocking" }
}

export default PublicRoutine

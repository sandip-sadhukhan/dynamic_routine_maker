import type {
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next"
import NotFound from "../../components/not-found"
import useGetAllPublicRoutines from "../../hooks/useGetAllPublicRoutines"
import useGetPublicRoutine, {
  IData,
} from "../../hooks/useGetPublicRoutine"

interface PublicRoutineProps {
  data: IData | null
}

const PublicRoutine: NextPage<PublicRoutineProps> = ({
  data,
}) => {
  if (!data) {
    return <NotFound />
  }

  return <div>PublicRoutine: {JSON.stringify(data)}</div>
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

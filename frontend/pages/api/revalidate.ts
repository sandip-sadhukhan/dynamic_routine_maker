import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check for secret to confirm this is a valid request
  const slug = req.query.slug
  const token = req.query.secret
  const API_KEY = process.env.REVALIDATION_SECRET_KEY

  if (token !== API_KEY) {
    return res
      .status(401)
      .json({ message: "Invalid token" })
  } else if (!slug) {
    return res
      .status(400)
      .json({ message: "Provide a slug" })
  }

  const revalidateUrl = `/r/${slug}`

  try {
    await res.revalidate(revalidateUrl)
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send("Error revalidating")
  }
}

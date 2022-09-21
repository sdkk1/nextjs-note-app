import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}
type Message = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Message>
) {
  console.log('Revalidating notes page...')

  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Your secret is invalid !' })
  }

  let revalidated = false

  try {
    await res.revalidate('/notes')
    revalidated = true
  } catch (err) {
    console.log(err)
  }

  return res.json({ revalidated })
}

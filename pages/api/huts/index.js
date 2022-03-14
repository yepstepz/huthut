import { dbConnect } from '../../../server/db'
import Hut from '../../../models/Hut'

export default async function handler(req, res) {
  const {
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const huts = await Hut.find({ })
        res.status(200).json({ success: true, data: hut })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

      case 'POST':
        try {
          const hut = await Hut.create(
            req.body
          ) /* create a new model in the database */
          res.status(201).json({ success: true, data: hut })
        } catch (error) {
          res.status(400).json({ success: false })
        }
        break
      default:
        res.status(400).json({ success: false })
        break
  }
}

import { dbConnect } from '../../../db'
import Hut from '../../../models/Hut'

export default async function handler(req, res) {
  const {
    query: { alias },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const hut = await Hut.findOne({ alias })
        if (!hut) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: hut })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its Alias */:
      try {
        const hut = await Hut.findOneAndUpdate({ alias }, req.body, {
          new: true,
          runValidators: true,
        })
        if (!hut) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: hut })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'DELETE' /* Delete a model by its ID */:
      try {
        const deletedHut = await Hut.deleteOne({ alias })
        if (!deletedHut) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}
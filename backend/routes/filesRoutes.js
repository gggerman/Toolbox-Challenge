import express from 'express'
import { getFormattedFilesData, getFilesList } from '../controllers/filesController.js'
const router = express.Router()

router.get('/data', async (req, res) => {
  try {
    const fileName = req.query.fileName // Obtener el nombre de archivo de la consulta
    const filesData = await getFormattedFilesData(fileName) // Pasar el nombre de archivo al controlador
    res.json(filesData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

router.get('/list', async (req, res) => {
  try {
    const filesData = await getFilesList()
    res.json(filesData)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
  }
})

export default router

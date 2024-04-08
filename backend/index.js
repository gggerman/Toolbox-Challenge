import express from 'express'
import cors from 'cors'
import filesRoutes from './routes/filesRoutes.js'

const app = express()
const PORT = process.env.PORT || 3001

// Habilitar CORS
app.use(cors())

// Definir rutas
app.use('/files', filesRoutes)

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en el puerto ${PORT}`)
})

export default app

import express from 'express'
import filesRoutes from './routes/filesRoutes.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use('/files', filesRoutes)

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en el puerto ${PORT}`)
})

export default app

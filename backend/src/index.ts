import express from 'express'
import dotenv from 'dotenv'
import tarefasRoutes from './routes/tarefas'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3333

app.use(express.json())

app.use('/tarefas', tarefasRoutes)

app.get('/', (req, res) => {
  res.json({ mensagem: 'API do TaskFlow rodando!' })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
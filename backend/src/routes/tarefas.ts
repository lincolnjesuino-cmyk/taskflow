import { Router } from 'express'
import { prisma } from '../config/prisma'

const router = Router()

router.get('/', async (req, res) => {
  const tarefas = await prisma.tarefa.findMany()
  res.json(tarefas)
})

router.post('/', async (req, res) => {
  const { texto, userId } = req.body

  const novaTarefa = await prisma.tarefa.create({
    data: {
      texto,
      userId,
    },
  })

  res.status(201).json(novaTarefa)
})

export default router
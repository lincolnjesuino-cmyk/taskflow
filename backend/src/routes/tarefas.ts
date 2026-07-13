import { Router } from 'express'
import { prisma } from '../config/prisma'

const router = Router()

router.get('/', async (req, res) => {
  const tarefas = await prisma.tarefa.findMany()
  res.json(tarefas)
})

export default router
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

router.patch('/:id', async (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const tarefaAtualizada = await prisma.tarefa.update({
    where: { id: Number(id) },
    data: { status },
  })

  res.json(tarefaAtualizada)
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  await prisma.tarefa.delete({
    where: { id: Number(id) },
  })

  res.status(204).send()
})

export default router
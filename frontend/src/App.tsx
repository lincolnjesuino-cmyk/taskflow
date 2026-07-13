import './App.css'
import Header from './Header'
import {useState} from 'react'   

type Tarefa = {
  id: number
  texto: string
  concluida: boolean
}

function App() {
  const [texto, setTexto] = useState("")
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    {id: 1, texto: "Estudar TS", concluida: false},
    {id: 2, texto: "Fazer compras", concluida: false}

  ])
  return (
    <>
        <Header titulo="TaskFlow" />

        <ul>
          {tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <span style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}>
              {tarefa.texto}
            </span>
            <button onClick={() => {
              setTarefas(tarefas.map((t) => {
                if (t.id === tarefa.id) {
                  return {...t, concluida: !t.concluida}
                }
                return t
              }))

            }}>Concluir</button>
            <button onClick={() => {
              setTarefas(tarefas.filter((t) => t.id !== tarefa.id))
            }}>Excluir</button>
            </li>
      ))}
          </ul>

        <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)} />
        <button onClick={() => {
          setTarefas([...tarefas, {id: tarefas.length + 1, texto, concluida: false}])
          setTexto("")
        }}>Adicionar</button>

    </>
  )
}

export default App

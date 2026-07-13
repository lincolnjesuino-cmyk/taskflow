import './App.css'
import Header from './Header'
import {useState} from 'react'   
import ListaTarefas from './ListaTarefas'

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

  function concluirTarefa(id: number) {
    setTarefas(tarefas.map(tarefa => tarefa.id === id ? {...tarefa, concluida: !tarefa.concluida} : tarefa))
  }

  function excluirTarefa(id: number) {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id))
  }



  return (
    <>
        <Header titulo="TaskFlow" />
        
        <ListaTarefas 
        tarefas={tarefas} 
        aoConcluir={concluirTarefa} 
        aoExcluir={excluirTarefa} />

        <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)} />
        <button onClick={() => {
          setTarefas([...tarefas, {id: tarefas.length + 1, texto, concluida: false}])
          setTexto("")
        }}>Adicionar</button>

    </>
  )
}
 

export default App

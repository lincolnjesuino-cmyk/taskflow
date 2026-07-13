import './App.css'
import Header from './components/Header'
import {useState} from 'react'   
import ListaTarefas from './components/ListaTarefas'
import type { Tarefa } from './types/types'


function App() {
  const [texto, setTexto] = useState("")
  const [tarefas, setTarefas] = useState<Tarefa[]>([
    {id: 1, texto: "Estudar TS", concluida: false},
    {id: 2, texto: "Fazer compras", concluida: false}
  ])
  const [temaEscuro, setTemaEscuro] = useState(false)

  function concluirTarefa(id: number) {
    setTarefas(tarefas.map(tarefa => tarefa.id === id ? {...tarefa, concluida: !tarefa.concluida} : tarefa))
  }

  function excluirTarefa(id: number) {
    setTarefas(tarefas.filter(tarefa => tarefa.id !== id))
  }



  return (
    
       <div className={`min-h-screen p-6 bg-surface ${temaEscuro ? 'dark' : ''}`}>
          <Header titulo="TaskFlow" />
    
  
          <ListaTarefas 
            tarefas={tarefas} 
            aoConcluir={concluirTarefa} 
            aoExcluir={excluirTarefa} />

          <input className='bg-surface text-text placeholder:text-text-muted border border-text-muted focus:outline-none focus:ring-2 focus:ring-accent' 
                 type="text" value={texto} onChange={(e) => setTexto(e.target.value)} />
          <button  className="px-4 py-2 rounded-lg bg-accent text-surface font-bold" onClick={() => {
          setTarefas([...tarefas, {id: tarefas.length + 1, texto, concluida: false}])
          setTexto("")
          }}>Adicionar</button>
          <button onClick={() => setTemaEscuro(!temaEscuro)}>Trocar Tema</button>
        </div>
    
  )
}
 

export default App

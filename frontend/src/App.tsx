import './App.css'
import Header from './Header'
import {useState} from 'react'    

function App() {
  const [tarefas, setTarefas] = useState(["Estudar TS", "Fazer compras"])
  const [texto, setTexto] = useState("")
  return (
    <>
        <Header titulo="TaskFlow" />

        <ul>
          {tarefas.map((tarefa) => (
          <li key={tarefa}>{tarefa}</li>
      ))}
          </ul>

        <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)} />
        <button onClick={() => {
          setTarefas([...tarefas, texto])
          setTexto("")
        }}>Adicionar</button>


    </>
  )
}

export default App

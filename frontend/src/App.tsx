import './App.css'
import Header from './Header'
import {useState} from 'react'    

function App() {
  const [tarefas, setTarefas] = useState(["Estudar TS", "Fazer compras"])
  return (
    <>
        <Header titulo="TaskFlow" />

        <ul>
          {tarefas.map((tarefa) => (
          <li key={tarefa}>{tarefa}</li>
      ))}
          </ul>


    </>
  )
}

export default App

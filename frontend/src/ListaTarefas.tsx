
type Tarefa = {
  id: number
  texto: string
  concluida: boolean
}

function ListaTarefas(props: { tarefas:Tarefa[], aoConcluir: (id:number) => void, aoExcluir: (id:number) => void }) {
    return (
        <ul>
          {props.tarefas.map((tarefa) => (
          <li key={tarefa.id}>
            <span style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}>
              {tarefa.texto}
            </span>
            <button onClick={() => props.aoConcluir(tarefa.id)}>Concluir</button>
            <button onClick={() => props.aoExcluir(tarefa.id)}>Excluir</button>
            </li>
      ))}
          </ul>
)}

export default ListaTarefas
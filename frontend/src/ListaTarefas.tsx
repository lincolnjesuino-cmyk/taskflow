import type { Tarefa } from './types'

function ListaTarefas(props: { tarefas:Tarefa[], aoConcluir: (id:number) => void, aoExcluir: (id:number) => void }) {
    return (
        <ul className="flex flex-col gap-3 ">
          {props.tarefas.map((tarefa) => (
          <li className='bg-card rounded-lg p-4 flex items-center gap-3'
          key={tarefa.id}>
            <span className="text-text"
            style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}>
              {tarefa.texto}
            </span>
            <button className="px-4 py-2 rounded-lg bg-accent text-surface font-bold" 
            onClick={() => props.aoConcluir(tarefa.id)}>Concluir</button>
            <button className="px-4 py-2 rounded-lg bg-card border border-text-muted"
             onClick={() => props.aoExcluir(tarefa.id)}>Excluir</button>
            </li>
      ))}
          </ul>
)}

export default ListaTarefas
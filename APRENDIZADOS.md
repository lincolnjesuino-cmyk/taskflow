# Aprendizados — TaskFlow

Glossário pessoal de conceitos, com exemplos reais do projeto. Cada seção tem o "o quê", o "porquê" e, quando relevante, o erro que eu já cometi com isso.

## Componente
Uma função que retorna JSX. Pode ser usado dentro de outro componente.
```tsx
function Header(props: { titulo: string }) {
  return <h1>{props.titulo}</h1>
}
```

## Props (dado)
Forma de um componente receber informação de fora. Somente leitura.
```tsx
<Header titulo="TaskFlow" />
```

## Props (função)
Uma prop também pode ser uma função — permite o filho "avisar" o pai que algo aconteceu, sem saber como isso deve ser tratado.
```tsx
// no filho
<button onClick={() => props.aoConcluir(tarefa.id)}>Concluir</button>

// no pai
<ListaTarefas aoConcluir={concluirTarefa} />
```
Passa a função **sem** `()` — se tivesse `()`, ela executaria na hora de renderizar, não no clique.

## useState
Guarda um valor entre atualizações de tela. Retorna sempre um par: `[valorAtual, funcaoParaMudar]`.
```tsx
const [tarefas, setTarefas] = useState<Tarefa[]>([...])
```

## Imutabilidade
Nunca alterar array/objeto de estado diretamente. Sempre criar uma cópia nova.
- Adicionar: `setTarefas([...tarefas, novaTarefa])`
- Atualizar um campo: `{...tarefa, concluida: !tarefa.concluida}`

**Por quê:** o React decide se redesenha a tela comparando se a *referência* (endereço na memória) mudou — não o conteúdo interno. `push()` mantém a mesma referência, então o React acha que nada mudou.

## .map() para renderizar lista
Transforma array de dados em array de JSX. Sempre com `key` única.
```tsx
{tarefas.map((tarefa) => (
  <li key={tarefa.id}>{tarefa.texto}</li>
))}
```

## .map() para atualizar um item específico
Percorre tudo, transforma só o que bate com a condição, devolve o resto sem mudar.
```tsx
setTarefas(tarefas.map((t) => {
  if (t.id === idAlvo) {
    return { ...t, concluida: !t.concluida }
  }
  return t
}))
```
**Erro que já cometi:** usar `.filter()` aqui em vez de `.map()`. `.filter()` decide se um item *entra ou não* no array novo — mas se decidir manter, mantém o item **original**, ignorando qualquer transformação que eu tenha calculado dentro dele.

## .filter() para deletar
Decide quais itens sobrevivem, baseado numa condição true/false.
```tsx
setTarefas(tarefas.filter((t) => t.id !== idAlvo))
```

## type (TypeScript)
Define a "forma" exigida de um dado. O editor avisa erro na hora se algo não bater.
```tsx
type Tarefa = {
  id: number
  texto: string
  concluida: boolean
}
```
Tipos compartilhados entre arquivos moram num arquivo próprio (`types/types.ts`) e são importados com `import type { Tarefa } from '../types/types'`.

## Escopo e "foto congelada" do estado
Dentro de uma função de evento (`onClick`), a variável de estado é uma foto do momento em que a função começou a rodar. Chamar `setTarefas` duas vezes seguidas na mesma função, ambas baseadas na mesma `tarefas` original, faz a última chamada "vencer" e ignorar a primeira.
**Erro que já cometi:** colocar `.map()` (concluir) e `.filter()` (excluir) dentro do mesmo `onClick` — a segunda chamada ignorava a primeira. Corrigido separando em dois botões, cada um com seu próprio `onClick` e seu próprio `setTarefas`.

## Fragment (`<>`) vs elemento real (`<div>`)
`<>` agrupa elementos sem gerar nada no HTML final — por isso **não aceita** `className` nem nenhum atributo. Se precisar de estilo no grupo, precisa ser uma tag real.

## Template string e operador ternário
Crase (` `` `) permite misturar texto fixo com variáveis via `${...}`.
```tsx
className={`min-h-screen p-6 bg-surface ${temaEscuro ? 'dark' : ''}`}
```
O ternário `condicao ? valorSeVerdadeiro : valorSeFalso` é um if/else compacto.

## Variáveis CSS + dark/light mode
Tokens de cor (`--color-surface`, etc.) são definidos uma vez no `@theme` (valores claros) e redefinidos dentro de `.dark { }` (valores escuros). As classes do Tailwind (`bg-surface`) sempre apontam pra variável, nunca pro valor fixo — por isso trocar a classe `dark` no elemento pai muda a paleta inteira.

## Caminhos relativos de import
- `./arquivo` — mesma pasta
- `../arquivo` — sobe uma pasta
- `../../arquivo` — sobe duas pastas

## Conventional Commits
- `feat:` funcionalidade nova
- `fix:` correção de bug
- `refactor:` reorganização sem mudar comportamento
- `chore:` manutenção/configuração
- `docs:` documentação
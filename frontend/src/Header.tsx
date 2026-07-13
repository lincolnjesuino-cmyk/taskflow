export default Header

function Header(props: { titulo: string }) {
  return <h1 className="text-3xl font-bold bg-surface text-accent p-4 font-display">{props.titulo}</h1>
}
export default Header

function Header(props: { titulo: string }) {
  return <h1 className="text-3xl font-bold bg-[#26241E] text-[#D9A441] p-4">{props.titulo}</h1>
}
import './Header.scss'
import logoSVG from '../../assets/todolist-logo.svg'

export function Header() {
  return (
    <header className="wrapper">
      <img src={logoSVG} alt="" />
    </header>
  )
}

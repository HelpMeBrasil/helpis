import './style.scss'


interface ButtonProps {
  value: string;
}

export function Button({value}: ButtonProps) {
  return(
    <button className="button_form" type="submit">{value}</button>
  )
}
import "./styles.scss"

type CheckBoxProps = {
  value: string
}
export function CheckBox({value}: CheckBoxProps) {
  return(
  <div className="checkboxContainer">
  <input className="inputCheckBox" type="checkbox" id={value} value={value}/>
  <label className="labelCheckBox" htmlFor={value}>{value}</label>
  </div>
  )
}
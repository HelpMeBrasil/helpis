import "./styles.scss"

type CheckBoxProps = {
  value: string
  onSetChange: (value: React.SetStateAction<string>) => void
}


export function CheckBox({value, onSetChange}: CheckBoxProps) {
  function handleSetChange(e: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;
    if(isChecked) {
      onSetChange(value);
    }else{
      onSetChange('');
    }
    
  }

  return(
  <div className="checkboxContainer">
  <input className="inputCheckBox" type="checkbox" id={value} value={value} onChange={e => handleSetChange(e)}/>
  <label className="labelCheckBox" htmlFor={value}>{value}</label>
  </div>
  )
}
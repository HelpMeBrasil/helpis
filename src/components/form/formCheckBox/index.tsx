import { useEffect, useState } from "react";
import "./styles.scss"

type CheckBoxProps = {
  value: string;
  onChecked?: boolean;
  onSetChange: (value: React.SetStateAction<string>) => void;
}


export function CheckBox({value, onSetChange, onChecked}: CheckBoxProps) {

  const [onCheck, setOnCheck] = useState<boolean>(onChecked === undefined ? false : onChecked);
  
  useEffect(() => {
    async function changeOnCheck() {
      setOnCheck(onChecked === undefined ? false : onChecked);
    }
     
      changeOnCheck();
  },[onChecked]);

  function handleSetChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOnCheck(e.target.checked)

    const isChecked = e.target.checked;
    if(isChecked) {
      onSetChange(value);
    }else{
      onSetChange('');
    }
    
  }

  return(
  <div className="checkboxContainer">
  <input className="inputCheckBox" type="checkbox" id={value} checked={onCheck} value={value} onChange={e => handleSetChange(e)}/>
  <label className="labelCheckBox" htmlFor={value}>{value}</label>
  </div>
  )
}
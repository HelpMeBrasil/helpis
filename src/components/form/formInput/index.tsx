import './style.scss';
interface InputProps {
  value: string | number;
  onSetState?: (value: React.SetStateAction<string>) => void
  type: string;
  placeholder: string;
  onSize?: number;
  disabled?:  boolean;
}
export function Input ({value, onSetState, type, placeholder, onSize, disabled}:InputProps){
  if(disabled === undefined){
  return(
    <input required value={value} maxLength={onSize} onChange={e => onSetState!(e.target.value)} className="form__input" type={type} placeholder={placeholder} disabled={disabled}/>
  )
  }else{
    return(
    <input required value={value}  maxLength={onSize} onChange={e => onSetState!(e.target.value)} className="form__input_disabled" type={type} placeholder={placeholder} disabled={disabled}/>
    )
  }
}

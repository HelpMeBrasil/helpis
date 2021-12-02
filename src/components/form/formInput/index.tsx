import './style.scss';
interface InputProps {
  value: string;
  onSetState: (value: React.SetStateAction<string>) => void
  type: string;
  placeholder: string;
}
export function Input ({value, onSetState, type, placeholder}:InputProps){
  return(
    <input value={value} onChange={e => onSetState(e.target.value)} className="form__input" type={type} placeholder={placeholder} />
  )
}

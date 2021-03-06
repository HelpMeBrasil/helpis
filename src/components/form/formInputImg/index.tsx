import './style.scss';
interface InputProps {
  //onSetState: (value: React.SetStateAction<File>) => void
  onSetState: any;
  type: string;
  accept: string;
  id: string;
  name: string;
  required: boolean;
}
export function InputImg ({onSetState, type, accept, id, name, required}:InputProps){
  return(
    <input required={required} id={id} name={name} onChange={e => onSetState(e.target.files)} className="form__inputImg" type={type} accept={accept} />
  )
}

import './style.scss';
interface InputProps {
  //onSetState: (value: React.SetStateAction<File>) => void
  onSetState: any;
  type: string;
  accept: string;
}
export function InputImg ({onSetState, type, accept}:InputProps){
  return(
    <input onChange={e => onSetState(e.target.files)} className="form__inputImg" type={type} accept={accept} />
  )
}

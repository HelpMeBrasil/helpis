import './styles.scss'

interface TextareaProps {
  value: string;
  onSetState: (value: React.SetStateAction<string>) => void
}
export function Textarea({value, onSetState}: TextareaProps) { 

  return(
    <textarea className="form_textarea" value={value} onChange={e => onSetState(e.target.value)} />
  )

}
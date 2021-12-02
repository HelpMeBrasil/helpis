import './style.scss'
interface LabelProps {
  valueName: String;

}
export function Label({valueName}: LabelProps){

  return (
    <label className="paragraphs">{valueName}</label>
  )
}

import './style.scss'
interface LabelProps {
  valueName?: string | number;
  center?: string;

}
export function Label({valueName, center}: LabelProps){
  if(center === undefined){
    return (
      <label className="paragraphs">{valueName}</label>
    )
  }else{
    return (
      <label className="paragraphsCenter">{valueName}</label>
    )
  }
}

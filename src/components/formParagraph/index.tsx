import './style.scss'
interface ParagraphProps {
  valueName: String;

}
export function Paragraph({valueName}: ParagraphProps){

  return (
    <p className="paragraphs">{valueName}</p>
  )
}
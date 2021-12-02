import './style.scss';
interface TitleProps{
  tag: string
  onClassName: string
  value: string;
}
export function Title({tag,onClassName,value}: TitleProps){

  let retorno = <h1 className={onClassName}>{value}</h1>

  if(tag === "h2"){
    retorno = <h2 className={onClassName}>{value}</h2>
  }


  return(
    retorno
  )
  
}

import { ReactNode } from 'react';
import './style.scss';
interface TitleProps{
  tag: string
  onClassName: string
  value?: string;
  children?: ReactNode;
}
export function Title({tag,onClassName,value, children}: TitleProps){
  let retorno = <h1 className={onClassName}>{value}</h1>

  if(tag === "h2"){
    retorno = <h2 className={onClassName}>{value}</h2>
    if(children !== undefined){
      retorno = <h2 className={onClassName}>{children}</h2>
     }
  }


  return(
    retorno
  )
  
}

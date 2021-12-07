import { ReactNode } from 'react';
import './styles.scss';

type ListaContentProps = {
    children: ReactNode,
}


export function ListaContent({children}: ListaContentProps){
    
    
    return(
        <ul className="campanhas_container" >
            {children}
        </ul>
    )
}
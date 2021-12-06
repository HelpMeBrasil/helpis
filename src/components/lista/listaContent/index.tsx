import { ReactNode } from 'react';
import './styles.scss';

type CampaignProps = {
    id: string;
    title: string,
    description: string,
    image: string,
}

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
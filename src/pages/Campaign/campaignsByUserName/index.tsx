import { useContext, useEffect, useState } from 'react'
import { Label, Title } from '../../../components/form';
import { AuthContext } from "../../../context/AuthContext";

import './styles.scss'
type CampaignReturnProps = {
    id: string;
    title: string,
    description: string,
    image: string,
  }

export function CampaignsByUserName(){
    const { listGridByUserName } = useContext(AuthContext);
    const [ campaigns, setCampaigns ] = useState<CampaignReturnProps[]>([]);

    

    useEffect(() => {
        async function campaignsGet() {
            const response = await listGridByUserName();
            console.log("teste"+ response)
            setCampaigns(response);
        }
        campaignsGet();
    },[campaigns])

    return(
    <>
    <Title tag="h1" onClassName="title_h1" value="Minhas campanhas"/>
    <ul className="campanhas_container" >
          {campaigns.map(campaign => (
            <li className="campanhas_list" key={campaign.id}>
            <Title tag="h1" onClassName="title_h1" value={campaign.title}/>
            <img className="campanha_img" src={campaign.image}/>
            <Label valueName={campaign.description}/>
            </li>
            
          ))}
    </ul>
    </>
    )
}
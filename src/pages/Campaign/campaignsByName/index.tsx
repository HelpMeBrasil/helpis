import { useContext, useEffect, useState } from 'react'
import { Label, Title } from '../../../components/form';
import { ListaContent } from '../../../components/lista/listaContent';
import { AuthContext } from "../../../context/AuthContext";
import { Icon } from 'react-icons-kit'
import { home } from 'react-icons-kit/icomoon/home'
import {edit} from 'react-icons-kit/feather/edit'
import {deleteIconic} from 'react-icons-kit/typicons/deleteIconic'
import './styles.scss'
import { Link, useParams } from 'react-router-dom';
type CampaignReturnProps = {
    hash: string,
    title: string,
    description: string,
    image: string,
  }

export function CampaignsName(){
    const { listGridSite } = useContext(AuthContext);
    const [ campaigns, setCampaigns ] = useState<CampaignReturnProps[]>([]);
    const { campaignName } = useParams<string>();

    useEffect(() => {
        async function campaignsGet() {
            const response = await listGridSite(campaignName!);
            console.log(response);
            setCampaigns(response);
        }
        campaignsGet();
    },[campaigns])

    return(
    <>
    <Title tag="h1" onClassName="title_h1" value="Pesquisa por nome"/>
    <ListaContent>
          {campaigns.map(campaign => (
            <li className="campanhas_list" key={campaign.hash}>
            <Title tag="h1" onClassName="title_h1" value={campaign.title}/>
            <img className="campanha_img" src={campaign.image}/>
            <Label valueName={campaign.description}/>
            </li>
          ))}
    </ListaContent>
    </>
    )
}
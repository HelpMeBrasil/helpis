import { useContext, useEffect, useState } from 'react'
import { Label, Title } from '../../../components/form';
import { ListaContent } from '../../../components/lista/listaContent';
import { AuthContext } from "../../../context/AuthContext";
import './styles.scss'
import { Link, useParams } from 'react-router-dom';
type CampaignReturnProps = {
    hash: string,
    title: string,
    description: string,
    image?: string,
  }

export function CampaignsName(){
    const { listGridSite } = useContext(AuthContext);
    const [ campaigns, setCampaigns ] = useState<CampaignReturnProps[]>([]);
    const { campaignName } = useParams<string>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function campaignsGet() {
            const response = await listGridSite(campaignName!);
            setCampaigns(response);
            setLoading(false);
        }
        campaignsGet();
    },[campaignName, listGridSite])

    if(loading === true){
    return(
        <Title tag="h1" onClassName="title_h1" value="Carregando"/>
    )
    }
    else{
    return(
    
    <>

    {campaigns.length === 0 ?
    <Title tag="h1" onClassName="title_h1" value="Não existem campanhas com esse nome"/> : 
    <>
    <Title tag="h1" onClassName="title_h1" value="Pesquisa por nome"/>
    <hr></hr>
    <ListaContent>
          {campaigns.map(campaign => (
            <Link style={{ textDecoration: 'none', width:'5%' }} to={"/ver_campanha/"+campaign.hash}>
            <li className="campanhas_list" key={campaign.hash}>
            <Title tag="h1" onClassName="title_h1" value={campaign.title}/>
            <img alt="imagem_campanha" className="campanha_img" src={campaign.image}/>
            <Label valueName={campaign.description}/>
            </li>
            </Link>
          ))}
    </ListaContent>
    </>
    }
    </>
    
    )
}
}
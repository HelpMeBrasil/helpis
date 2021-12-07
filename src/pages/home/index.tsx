import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ContentLarge } from "../../components/contentLarge";
import { Label, Title } from "../../components/form";
import { ListaContent } from "../../components/lista/listaContent";
import { AuthContext } from "../../context/AuthContext";

import './styles.scss';

type CampaignReturnPropsAll = {
  hash: string,
  title: string,
  description: string,
  image: string,
}[]

export function Home() {
  const [campaigns, setCampaigns] = useState<CampaignReturnPropsAll>([]);
  const { getAllCampaigns } = useContext(AuthContext);
  useEffect(() => {
    async function requestAllCampaigns(){
      const response = await getAllCampaigns()
      setCampaigns(response);
    }
    requestAllCampaigns();
  },[getAllCampaigns])
  return(
    <>
    <ContentLarge>
        <Title tag="h1" onClassName="title_h1" value="Bem vindo ao Helpis"/>
    </ContentLarge>
    <ContentLarge>
        <Title tag="h2" onClassName="title_h2" value="Seja a difença na vida de alguém"/>
    </ContentLarge>
    <Title tag="h1" onClassName="title_h1" value="Campanhas cadastradas"/>
    <ListaContent>
          {campaigns.map(campaign => (
            <li className="campanhas_listHome" key={campaign.hash}>
            <Link style={{ textDecoration: 'none', width:'100%', height: '100%' }} to={"/ver_campanha/"+campaign.hash}>
            <Title tag="h1" onClassName="title_h1" value={campaign.title}/>
            <img alt="imagem_campanha" className="campanha_imgHome" src={campaign.image}/>
            <div>
            <Label valueName="Sobre"/>
            </div>
            <Label valueName={campaign.description}/>
            </Link>
            </li>

          ))}
    </ListaContent>
    </>
  )
}
import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Label, Title } from "../../components/form";
import { ListaContent } from "../../components/lista/listaContent";
import { AuthContext } from "../../context/AuthContext";

import './styles.scss';

type CampaignReturnPropsAll = {
  hash: string,
  title: string,
  description: string,
  image: string,
  targetValue: string
    user: {
      firstName: string,
      surname: string,
      merchant:{
        address: {
          cityName: string,
          stateInitials: string
        }
      }
    }
}[]

export function Home() {
  const [campaigns, setCampaigns] = useState<CampaignReturnPropsAll>([]);
  const { getAllCampaigns } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function requestAllCampaigns(){
      const response = await getAllCampaigns()
      setCampaigns(response);
      setLoading(false);
    }
    requestAllCampaigns();
  },[getAllCampaigns])
  
  if(loading === true){
    return(
      <div id="container_loader">
      <div id="loader"></div>
      </div>
    )
    }
    else{
    return(
    
      <>
      <div id="Image">
        <img alt="imgmenu" src="/wallpaper-home.jpg" width='100%' height='530px'/>
        <h1 id="First-txt">
        Bem-vindo ao Helpis
        </h1>
        <h2 id="Second-txt">
        Seja a diferença na vida de alguém
        </h2>  
      </div>

      <div className="container_taxs">
        <div className="items_taxs">
          <img alt="imgCard"  src="/cartao.png"  id=""/>
          <p> Cartão de creédito: 2,80% </p>
        </div>

        <div className="items_taxs">
          <img alt="imgCard"  src="/cartao.png"  id=""/>
          <p> Cartão de dédito: 2,40% </p>
        </div>

        <div className="items_taxs">
          <img alt="imgCard"  src="/boleto.png"  id=""/>
          <p> Boleto bancário: R$ 1,96 </p>
        </div>

        <div className="items_taxs">
          <img alt="imgCard"  src="/pix.png"  id=""/>
          <p> PIX: 1% </p>
        </div>

        <div className="items_taxs">
          <img alt="imgCard"  src="/bitcoin.png"  id=""/>
          <p> Criptomoedas: 1,80% </p>
        </div>

      </div>



    {campaigns.length === 0 ?
    <Title tag="h1" onClassName="title_h1" value=""/> : 
    <>
    
    <Title tag="h1" onClassName="title_h1" value="Campanhas cadastradas"/>
    <hr></hr>
    <ListaContent>
          {campaigns.map(campaign => (
            <li className="campanhas_listHome" key={campaign.hash}>
            <Link style={{ textDecoration: 'none', width:'100%', height: '100%' }} to={"/ver_campanha/"+campaign.hash}>
            <Title tag="h1" onClassName="title_h1" value={campaign.title}/>

            <img title={campaign.title} alt="imagem_campanha" className="campanha_imgHome" src={campaign.image}/>

            <div>
              <h4>{campaign.user.firstName} {campaign.user.surname}</h4>
              <p>{campaign.user.merchant.address.cityName}/{campaign.user.merchant.address.stateInitials}</p>
            </div>
            <div>
            <b>Meta R$ {campaign.targetValue}</b>
            </div>
            <hr></hr>
            <Label valueName={campaign.description}/>
            </Link>
            </li>

          ))}
    </ListaContent>
    </>
    }
    </>
    
    )
}
}
import { useContext, useEffect, useState } from 'react'
import { Label, Title } from '../../../components/form';
import { ListaContent } from '../../../components/lista/listaContent';
import { AuthContext } from "../../../context/AuthContext";
import { Icon } from 'react-icons-kit'
import { edit } from 'react-icons-kit/feather/edit'
import { deleteIconic } from 'react-icons-kit/typicons/deleteIconic'
import './styles.scss'
import { Link } from 'react-router-dom';
type CampaignReturnProps = {
    hash: string,
    title: string,
    description: string,
    image?: string,
  }

export function CampaignsByUserName(){
    const { listGridByUserName, deletCampaign } = useContext(AuthContext);
    const [ campaigns, setCampaigns ] = useState<CampaignReturnProps[]>([]);

    

    useEffect(() => {
        async function campaignsGet() {
            const response = await listGridByUserName();
            setCampaigns(response);
            setLoading(false);
        }
        campaignsGet();
    },[listGridByUserName])


    function handleDelet(hash: string){

      const data = {
      hash
      }
      deletCampaign(data);
      const ac = new AbortController();
      return () => ac.abort();
    }
    

    const [loading, setLoading] = useState(true);
    if(loading === true){
    return(
      <div id="loader"></div>
    )}else{
    return(
    <>
    {campaigns.length === 0 ? <Title tag="h1" onClassName="title_h1" value="Você não possui campanhas"/> : 
    <>
    <Title tag="h1" onClassName="title_h1" value="Minhas campanhas"/>
    <hr></hr>
      <ListaContent>
            {campaigns.map(campaign => (
              <li className="campanhas_list" key={campaign.hash}>
              <Title tag="h1" onClassName="title_h1" value={campaign.title}/>
              <img alt="imagem_campanha" className="campanha_img" src={campaign.image}/>
              
              <Label valueName={campaign.description}/>
              <div className="container_buttons">
                  <Link to={`/editar_campanha/${campaign.hash}`}>
                  <div className="campanhas_buttonEdit">
                  <Icon size={30} icon={edit}/>
                  </div>
                  </Link>
                  <Link onClick={() => handleDelet(campaign.hash)} to="/minhas_campanhas">
                  <div className="campanhas_buttonDelet">
                  <Icon size={38} icon={deleteIconic}/>
                  </div>
                  </Link>
              </div>   
              </li>
              
              
            ))}
      </ListaContent>
      </>
    }
      </>
    )
  }
}
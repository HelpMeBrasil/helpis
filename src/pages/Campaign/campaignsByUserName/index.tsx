import { useContext, useEffect, useState } from 'react'
import { Label, Title } from '../../../components/form';
import { ListaContent } from '../../../components/lista/listaContent';
import { AuthContext } from "../../../context/AuthContext";
import { Icon } from 'react-icons-kit'
import { edit } from 'react-icons-kit/feather/edit'
import { deleteIconic } from 'react-icons-kit/typicons/deleteIconic'
import './styles.scss'
import { Link } from 'react-router-dom';
type CampaignReturnPropsAll = {
    hash: string,
    title: string,
    description: string,
    image: string,
    targetValue: string,
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

export function CampaignsByUserName(){
    const { listGridByUserName, deletCampaign } = useContext(AuthContext);
    const [ campaigns, setCampaigns ] = useState<CampaignReturnPropsAll>([]);

    

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
      <div id="container_loader">
      <div id="loader"></div>
      </div>
    )}else{
    return(
    <>
    {campaigns.length === 0 ? <div className="emptyCampaign"><Title tag="h1" onClassName="title_h1" value="Você não possui campanhas"/></div> : 
    <>
    <Title tag="h1" onClassName="title_h1" value="Minhas campanhas"/>
    <hr></hr>
      <ListaContent>
            {campaigns.map(campaign => (
              <li className="campanhas_list" key={campaign.hash}>
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
              <div className="container_buttons">
                  <Link to={`/editar_campanha/${campaign.hash}`}>
                  <div className="campanhas_buttonEdit">
                  <Icon title="Editar campanha" size={30} icon={edit}/>
                  </div>
                  </Link>
                  <Link onClick={() => handleDelet(campaign.hash)} to="/minhas_campanhas">
                  <div className="campanhas_buttonDelet">
                  <Icon title="Desativar campanha" size={38} icon={deleteIconic}/>
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
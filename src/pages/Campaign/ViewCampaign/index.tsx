import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Content } from '../../../components/content';
import { ContentButton } from '../../../components/contentButton';
import { Button, Label, Title } from '../../../components/form';

import { AuthContext } from "../../../context/AuthContext";
import { api } from '../../../services/api';

import './styles.scss';

type CampaignProps = {
    title: string,
    description: string,
    image: string,
  }

  interface ParamTypes {
    tokenName: string
  }

  
export function ViewCampaign() {
    const { hash } = useParams<string>();
    const [ campaign, setCampaign ] = useState<CampaignProps>({
        title: '',
        description: '',
        image: '',
    });
    const { viewCampaign } = useContext(AuthContext);

    useEffect(() => {
    async function searchCampaign() {
        const response = await viewCampaign(hash!)
        setCampaign(response);
        setLoading(false);
        }
    searchCampaign();
    },[viewCampaign])
    
    const [loading, setLoading] = useState(true);
    if(loading === true){
    return(
        <Title tag="h1" onClassName="title_h1" value="Carregando"/>
    )}else{
    return(
        <>
        <ContentButton>
        <Title tag="h2" onClassName="title_h2" value="Ajude"/>
        <Link to={"/payment/"+hash} ><Button value="Doar"/></Link>
        <Title tag="h2" onClassName="title_h2" value="Compartilhe"/>
        <Label valueName={api.defaults.baseURL!+"/"+hash}/>
        </ContentButton>
        <Content>
        <Title tag="h1" onClassName="title_h1" value={campaign.title}/>
        <img className="img_view" src={campaign.image} alt="img" />
        </Content>
        <Content>
        <Title tag="h1" onClassName="title_h1" value="Detalhes da campanha"/>
        <Label valueName={campaign.description}/>
        </Content>
        <div className="payment">
        
        </div>
        
        </>
        
    )
    }
}
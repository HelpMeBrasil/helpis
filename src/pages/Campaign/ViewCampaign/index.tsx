import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Content } from '../../../components/content';
import { ContentButton } from '../../../components/contentButton';
import { Button, Label, Title } from '../../../components/form';

import { AuthContext } from "../../../context/AuthContext";
import { api } from '../../../services/api';

import './styles.scss';

type CampaignProps = {
    title: string,
    description: string,
    image?: string,
    targetValue: number,
  }

export function ViewCampaign() {
    const { hash } = useParams<string>();
    const [loading, setLoading] = useState(true);
    const [ campaign, setCampaign ] = useState<CampaignProps>({
        title: '',
        description: '',
        image: '',
        targetValue: 0,
    });
    const { viewCampaign, listByReference } = useContext(AuthContext);
    const [ amount, setAmount ] = useState<number>(0);

    const url = api.defaults.baseURL!+"/"+hash;

    useEffect(() => {
    async function searchCampaign() {
        const response = await viewCampaign(hash!)
        const respostaAmount = await listByReference(hash!);
        setAmount(respostaAmount);
        setCampaign(response);
        setLoading(false);
        }
        searchCampaign();
    },[hash, listByReference, viewCampaign])


    function handleCopyURL(){
      navigator.clipboard.writeText(url)
      toast.success("URL copiada");
    }
    
    
    
    if(loading === true){
    return(
        <Title tag="h1" onClassName="title_h1" value="Carregando"/>
    )}else{
    return(
        <>
        <ContentButton>
        <Title tag="h2" onClassName="title_h2" value="Ajude"/>
        <Link to={"/payment/"+hash} ><Button value="Doar"/></Link>
        
        {/* <Title tag="h2" onClassName="title_h2" value={"Meta: "+campaign.targetValue}/>
        
        <Title tag="h2" onClassName="title_h2" value={"Arrecadado: "+amount}/> */}

        

        <p className="campaign_values" >Meta: {new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(campaign.targetValue)} </p>

      <p className="campaign_values">Alcançado: {new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(amount)} </p>

        <p className="campaign_values">Compartilhe </p>

        <p className="campaign_values_small">Clique para copiar</p>
        <button onClick={() => handleCopyURL()} className="campaign_copy_url">
        <p className="campaign_values_border"> {api.defaults.baseURL!+"/"+hash}  </p>
        </button>

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
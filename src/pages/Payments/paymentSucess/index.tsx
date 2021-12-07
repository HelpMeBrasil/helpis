import { useLocation } from "react-router-dom";
import { ContentLarge } from "../../../components/contentLarge";
import { Label, Title } from "../../../components/form";
import './styles.scss';


export function PaymentSucess() {
  const {state} = useLocation();
  const { description, walletAddress, barcode, amountBTC, qrCode, key } = state; // Read values passed on state
  return(
    <>
    <ContentLarge>
        <Title tag="h1" onClassName="title_h1" value="Informações abaixo sobre o pagamento:"/>
    </ContentLarge>
    <ContentLarge>
        <Label center="center" valueName={description}/>

        {barcode === undefined ? '' : 
        <>
        <Label center="center" valueName="Codigo de barras"></Label>
        <Label valueName={barcode}></Label>
        </>
         }

        {key === undefined ? '' : 
        <>
        <Label center="center" valueName="Key"></Label>
        <Label valueName={key}></Label>
        <Label center="center" valueName="QrCode"></Label>
        <img alt="qrcode" className="imgQrCodePayment" src={qrCode}/>
        </>
         }
         

        
        {walletAddress === undefined ? '' : 
        <>
        <Label center="center" valueName="Endereço da carteira"></Label>
        <Label valueName={walletAddress}></Label>
        <Label center="center" valueName="Quantidade"></Label>
        <Label valueName={amountBTC}></Label>
        </>
         }
        
    </ContentLarge>
    </>
  )
}
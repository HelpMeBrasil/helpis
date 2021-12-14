import { useLocation } from "react-router-dom";
import { Label } from "../../../components/form";
import './styles.scss';
import { toast } from 'react-toastify';


export function PaymentSucess() {
  const {state} = useLocation();
  const { description, walletAddress, digitableLine, bankSlipUrl, amountBTC, qrCode, key, authenticationUrl } = state; // Read values passed on state

  function handleCopyURL(codePaymentMethod: number){
    if(codePaymentMethod === 1){
      navigator.clipboard.writeText(digitableLine)
      toast.success("Código de barras copiado!");
    }
    if(codePaymentMethod === 6){
      navigator.clipboard.writeText(key)
      toast.success("Copia e cola copiado!");
    }
    if(codePaymentMethod === 3){
      navigator.clipboard.writeText(walletAddress)
      toast.success("Endereço copiado!");
    }
  }

  return(
    <div id="container__form">

      <div className="head">
        <div className="dummy-positioning d-flex">
          <div className="success-icon">
            <div className="success-icon__tip"></div>
            <div className="success-icon__long"></div>
          </div>
        </div>

        <div className="description">
          <Label valueName={description}/>
        </div>
        </div>

        {authenticationUrl === undefined ? '' :
        <>
        <div className="debit">
          <p>Para concluir o pagamento você precisa autenticar-se no seu ambiente bancário:</p>
          <a rel="noreferrer" className="url" href={authenticationUrl} target="_blank">{authenticationUrl}</a>
        </div>
        </> }

        {digitableLine === undefined ? '' : 
        <>
        <div className="digitableLine">
        <p>Código de barras</p>
        <button onClick={() => handleCopyURL(1)} className="copydigitableline">
        <p title='Copiar'> {digitableLine} </p>
        </button>
        </div>
        <div className="urlBankslip">
          <p>Link do boleto</p>
          <a rel="noreferrer" href={bankSlipUrl} target="_blank">{bankSlipUrl}</a>
        </div>
        </>
         }

        {key === undefined ? '' : 
        <>
        <div>
          <img alt="qrcode" className="imgQrCodePayment" src={qrCode}/>
          <p className="copy">Chave copia e cola</p>
          <button onClick={() => handleCopyURL(6)} className="copykey">
          <p title='Copiar'> {key} </p>
          </button>
        </div>
        </>
         }
        
        {walletAddress === undefined ? '' : 
        <>
        <div className="wallet">
        <Label center="center" valueName="Endereço da carteira:"></Label><br></br>
          <button onClick={() => handleCopyURL(3)} className="copyWallet">
          <p title='Copiar'> {walletAddress} </p>
          </button>
        </div>
        <div className="amount">
          <Label center="center" valueName="Quantidade em BTC"></Label><br></br>
          <p>$ {amountBTC}</p>
        </div>
        </>
         }
        
    </div>
  )
}
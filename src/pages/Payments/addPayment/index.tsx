
import {FormEvent, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Form, { Button, FormContainer, Input, Label, Title } from "../../../components/form";
import { AuthContext } from "../../../context/AuthContext";
import './styles.scss';
import NumberFormat from "react-number-format";
import CpfCnpj from "../../../utils/cpf";
import CurrencyInput from "../../../utils/react-currency-input-master/src";

export function Payment() {
  const { addPayment, requestMethods } = useContext(AuthContext);
  const [optionPayment, setOptionPayment] = useState('');

  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [identity, setIdentity] = useState('');
  const [name, setName] = useState('');
  const [donate, setDonate] = useState('');

  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [complement, setComplement] = useState('');
  const [cityName, setCityName] = useState('');
  const [stateInitials, setStateInitials] = useState('');
  const [countryName, setCountryName] = useState('BR');

  const [holder, setHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [expirationDateEua, setExpiradionDateEua] = useState('');
  const [boleto, setBoleto] = useState(false);
  const [credito, setCredito] = useState(false);
  const [debito, setDebito] = useState(false);
  const [pix, setPix] = useState(false);
  const [cripto, setCripto] = useState(false);
  const { hash } = useParams();
  const [loading, setLoading] = useState(true);

  function cardCredit() {

    return(
    <>
    <Title tag="h1" onClassName="title_h1" value="Dados do cartão"/>
    <Label valueName="Nome impresso no cartão"/>
    <Input value={holder} onSetState={setHolder} type="text" placeholder="Digite o nome no cartão"/>
  
    <Label valueName="Número do cartão"/>
    <Input value={cardNumber} onSetState={setCardNumber} type="number" placeholder="Digite o número do cartão"/>
 
    <Label valueName="Código"/>
    <Input value={securityCode} onSetState={setSecurityCode} type="text" placeholder="Digite o código"/>

    <Label valueName="Data de expiração"/>
    <Input value={expirationDateEua} onSetState={setExpiradionDateEua} type="month" placeholder="Digite a data de expiração"/>

    </>
    )
  }

  function cardDebit() {
    
    return(
    <>
    <Title tag="h1" onClassName="title_h1" value="Dados do cartão"/>
    <Label valueName="Nome impresso no cartão"/>
    <Input value={holder} onSetState={setHolder} type="text" placeholder="Digite o nome no cartão"/>
  
    <Label valueName="Número do cartão"/>
    <Input value={cardNumber} onSetState={setCardNumber} type="number" placeholder="Digite o número do cartão"/>
 
    <Label valueName="Código"/>
    <Input value={securityCode} onSetState={setSecurityCode} type="text" placeholder="Digite o código"/>

    <Label valueName="Data de expiração"/>
    <Input value={expirationDateEua} onSetState={setExpiradionDateEua} type="month" placeholder="Digite a data de expiração"/>
    
    </>
    )
  }

  useEffect(() => {
    async function methods(){
      const response = await requestMethods(hash!);
      for(let key in response){
        if(response[key].paymentMethod.code === "1" && response[key].isEnabled === true){
          
          setBoleto(true);
        }
        if(response[key].paymentMethod.code === "2" && response[key].isEnabled === true){
          setCredito(true);
        }
        if(response[key].paymentMethod.code === "3" && response[key].isEnabled === true){
          setCripto(true)
        }
        if(response[key].paymentMethod.code === "4" && response[key].isEnabled === true){
          setDebito(true);
        }
        if(response[key].paymentMethod.code === "6" && response[key].isEnabled === true){
          setPix(true);
        }
      }
      setLoading(false);
    }
    methods();
  },[hash, requestMethods])

  useEffect(() => {
    async function getZipCode(){
    if(zipCode.trim().length === 8){
      const response = await axios.get("https://viacep.com.br/ws/"+zipCode+"/json/",{headers: { 'Content-Type': 'application/json', }});
      
      if(response.data.erro !==true){
        setDistrict(response.data.bairro);
        setStreet(response.data.logradouro);
        setCityName(response.data.localidade);
        setStateInitials(response.data.uf);
        }else{
          toast.warning("CEP deve ser valido");
        }
      }
    }    
    getZipCode();
  },[zipCode])

  const paymentObject = () => {
    if(optionPayment==='1'){
      return {}
    }
    if(optionPayment==='2'){
      let brFormat = expirationDateEua.split("-");
      let dia = brFormat[1];
      let mes = brFormat[0];
      setExpiradionDateEua(dia+"/"+mes)
      let expirationDate = dia+"/"+mes;
      return {    
        holder,
        cardNumber,
        expirationDate,
        securityCode,
      }
    }
    if(optionPayment==='3'){
      return {}
    }
    if(optionPayment==='4'){
      let brFormat = expirationDateEua.split("-");
      let dia = brFormat[1];
      let mes = brFormat[0];
      setExpiradionDateEua(dia+"/"+mes)
      let expirationDate = dia+"/"+mes;
      return {
        holder,
        cardNumber,
        expirationDate,
        securityCode,
      }
    }
    if(optionPayment==='6'){
      return {}
    }
  }
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data = {
      hash,
      isSandbox: true,
      paymentMethod:{
        code: optionPayment
      },
      customer: {
        email,
        phoneNumber: phoneNumber.replaceAll("-", "").replaceAll("(", "").replaceAll(")", ""),
        identity: identity.replaceAll("-", "").replaceAll("/", "").replaceAll(".", ""),
        name,
        address: {
          street,
          number,
          district,
          zipCode,
          complement,
          cityName,
          stateInitials,
          countryName,
        },
      },
      products:[{
        code: "001",
        description: "doacao",
        unitPrice: parseInt(donate.replaceAll("R$", "").replaceAll(".", "").replaceAll(",", "")),
        quantity: 1,
      }],
      paymentObject: paymentObject(),
    }
    await addPayment(data);
    //await register(data);
  }


  if(loading === true){
  return(
    <div id="container_loader">
        <div id="loader"></div>
        </div>
  )}else{
  return(
      <FormContainer>
        <Title tag="h1" onClassName="title_h1" value="Pagamento"/>
        <Title tag="h2" onClassName="title_h2" value="Dados pessoais"/>
        <Form onSubmit={handleSubmit}>
        
        <Label valueName="Nome Completo"/>
          <Input value={name} onSetState={setName} type="text" placeholder="Digite seu nome completo"/>

          <Label valueName="CPF"/>
          <CpfCnpj
          className="form__input"
          placeholder="Digite um CPF ou CNPJ"
          type="tel"
          value={identity}
          onChange={(event, type: "CPF") => {
            setIdentity(event.target.value);
          }}
        />

          <Label valueName="Número de celular"/>
          <NumberFormat className="form__input" format="(##)#####-####" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="tel" placeholder="Numero formato DDD e NUMERO Exemplo: 00123456789"/>
          
          <Label valueName="Email"/>
          <Input value={email} onSetState={setEmail} type="text" placeholder="Digite seu email"/>
      
          <Title tag="h2" onClassName="title_h2" value="Endereço"/>

          <Label valueName="CEP"/>
          {/* <Input value={zipCode} onSetState={setZipCode} type="number" placeholder="Digite o cep"/> */}
          <NumberFormat className="form__input" format="########" value={zipCode} onChange={(e) => setZipCode(e.target.value)} type="tel" placeholder="Digite o cep"/>


          <Label valueName="Rua"/>
          <Input value={street} onSetState={setStreet} type="text" placeholder="Digite o endereço da sua rua" disabled={true}/>
        
          <Label valueName="Número"/>
          <Input value={number} onSetState={setNumber} type="number" placeholder="Digite o número"/>

          <Label valueName="Complemento"/>
          <Input value={complement} onSetState={setComplement} type="text" placeholder="Digite o complemento"/>
      
          <Label valueName="Bairro"/>
          <Input value={district} onSetState={setDistrict} type="text" placeholder="Digite o bairro" disabled={true}/>
        
          <Label valueName="Cidade"/>
          <Input value={cityName} onSetState={setCityName} type="text" placeholder="Digite a cidade" disabled={true}/>

          <Label valueName="Estado"/>
          <Input value={stateInitials} onSize={2} onSetState={setStateInitials} type="text" placeholder="Digite a sigla do estado" disabled={true}/>

          <Label valueName="País"/>
          <Input value={countryName} onSize={3} onSetState={setCountryName} type="text" placeholder="Digite a sigla do páis" disabled={true}/>
          
          <Title tag="h2" onClassName="title_h2" value="Doação"/>
          <Label valueName="Valor da doação: "/>
          {/* <Input value={donate}  onSetState={setDonate} type="number" placeholder="Digite a quantia"/> */}

          <CurrencyInput className="form__input" prefix="R$" value={donate} onChangeEvent={(e: any) => setDonate(e.target.value)}  required />

          <Label valueName="Métodos de pagamento que essa campanha aceita:"/>
          {boleto === true ? 
          <div className="formRadioButton">
          <input value="1" onChange={(e) => setOptionPayment(e.target.value)} className="radioButtonStyle" id="Radio1"  type="radio" name="payment" /><span>Boleto</span>
          </div> : ''}
          {credito === true ? 
          <div className="formRadioButton">
          <input value="2" onChange={(e) => setOptionPayment(e.target.value)} className="radioButtonStyle" id="Radio2" type="radio" name="payment"/><span>Cartão de credito</span>
          </div> : ''}
          {debito === true ? 
          <div className="formRadioButton">
          <input value="4" onChange={(e) => setOptionPayment(e.target.value)} className="radioButtonStyle" id="Radio3" type="radio" name="payment"/><span>Cartão de debito</span>
          </div> : ''}
          {pix === true ? 
          <div className="formRadioButton">
          <input value="6" onChange={(e) => setOptionPayment(e.target.value)} className="radioButtonStyle" id="Radio4" type="radio" name="payment"/><span>Pix</span>
          </div> : ''}
          {cripto === true ? 
          <div className="formRadioButton">
          <input value="3" onChange={(e) => setOptionPayment(e.target.value)} className="radioButtonStyle" id="Radio5" type="radio" name="payment"/><span>Criptomoeda</span>
          </div> : ''}
          {optionPayment === "2" ? cardCredit() : '' }
          {optionPayment === "4" ? cardDebit() : '' }
          <Button value="Doar"/>
        </Form>
      </FormContainer>
    )
  }
}
import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { toast } from "react-toastify";
import Form, { Button, CheckBox, FormContainer, Input, Label, Title } from "../../components/form";
import { AuthContext } from "../../context/AuthContext";
import CpfCnpj from "../../utils/cpf";



export function UserData() {
  const { userDataGet, userUpdate } = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [identity, setIdentity] = useState('');

  //Merchant
  const [name, setName] = useState('');
  const [commercialName, setCommercionalName] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [responsibleIdentity, setResponsibleIdentity] = useState('');

  //BankData
  const [codeBank , setCodeBank] = useState('');
  const [codeAccount, setCodeAccount] = useState('');

  //Account
  const [bankAgency, setBankAgency] = useState('');
  const [bankAgencyDigit, setBankAgencyDigit] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankAccountDigit, setBankAccountDigit] = useState('');

  //Address
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [complement, setComplement] = useState('');
  const [cityName, setCityName] = useState('');
  const [stateInitials, setStateInitials] = useState('');
  const [countryName, setCountryName] = useState('BR');

  const [boleto, setBoleto] = useState('');
  const [credito, setCredito] = useState('');
  const [debito, setDebito] = useState('');
  const [pix, setPix] = useState('');
  const [cripto, setCripto] = useState('');
  
  const [checkedBoleto,setCheckedBoleto] = useState(false);
  const [checkedCredito,setCheckedCredito] = useState(false);
  const [checkedCripto,setCheckedCripto] = useState(false);
  const [checkedDebito,setCheckedDebito] = useState(false);
  const [checkedPix,setCheckedPix] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function userDataSearch() {
      
      const response = await userDataGet();
      setFirstName(response.firstName);
      setSurname(response.surname);
      setEmail(response.email);
      setPhoneNumber(response.phoneNumber);
      setIdentity(response.identity);
      setName(response.merchant.name);
      setCommercionalName(response.merchant.commercialName);
      setResponsibleName(response.merchant.responsibleName);
      setResponsibleIdentity(response.merchant.responsibleIdentity);
      setCodeBank(response.merchant.bankData.bank.code);
      setCodeAccount(response.merchant.bankData.accountType.code);
      setBankAgency(response.merchant.bankData.bankAgency);
      setBankAgencyDigit(response.merchant.bankData.bankAgencyDigit);
      setBankAccount(response.merchant.bankData.bankAccount);
      setBankAccountDigit(response.merchant.bankData.bankAccountDigit);
      setBankAgency(response.merchant.bankData.bankAgency);
      setBankAgencyDigit(response.merchant.bankData.bankAgencyDigit);
      setStreet(response.merchant.address.street);
      setNumber(response.merchant.address.number);
      setDistrict(response.merchant.address.district);
      setZipCode(response.merchant.address.zipCode);
      setComplement(response.merchant.address.complement);
      setCityName(response.merchant.address.cityName);
      setStateInitials(response.merchant.address.stateInitials);
      setCountryName(response.merchant.address.countryName);
      setLoading(false);
     
      const merchantSplits = response.merchant.merchantSplit;
      for(let i=0; i<merchantSplits.length; i++){
        if(merchantSplits[i].paymentMethodCode === '1') {
          setCheckedBoleto(true);
          setBoleto('Boleto');
        }
        if(merchantSplits[i].paymentMethodCode === '2') {
          setCredito('Credio');
          setCheckedCredito(true);

        }
        if(merchantSplits[i].paymentMethodCode === '3') {
          setCripto('Cripto');
          setCheckedCripto(true);
        }
        if(merchantSplits[i].paymentMethodCode === '4') {
          setDebito('Debito');
          setCheckedDebito(true);
        }
        if(merchantSplits[i].paymentMethodCode === '6') {
          setCheckedPix(true);
          setPix('Pix');
        }
      }
    }
    userDataSearch();
  },[userDataGet]);

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
  
  const validations = () => {
    const validaCpf = identity.match("([0-9]{2}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[\\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\\.]?[0-9]{3}[\\.]?[0-9]{3}[-]?[0-9]{2})");
    if(validaCpf === null){
      toast.warning("Insira um cpf/cnpj v??lido");
      return true
    }
    else if(identity.length === 14 || identity.length === 11){
    }else{
      toast.warning("Cpf invalido")
      return true
    }
  }
 
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if(validations() !== true){
    const data = {
      firstName,
      surname,
      email,
      phoneNumber: phoneNumber.replaceAll("-", "").replaceAll("(", "").replaceAll(")", ""),
      identity: identity.replaceAll("-", "").replaceAll("/", "").replaceAll(".", ""),
      name,
      commercialName,
      responsibleName,
      responsibleIdentity: responsibleIdentity.replaceAll("-", "").replaceAll("/", "").replaceAll(".", ""),
      codeBank,
      codeAccount,
      bankAgency,
      bankAgencyDigit,
      bankAccount,
      bankAccountDigit,
      street,
      number,
      district,
      zipCode,
      complement,
      cityName,
      stateInitials,
      countryName,
      boleto,
      credito,
      cripto,
      debito,
      pix
    }
    await userUpdate(data);
  }
}

  
if(loading === true){
  return(
    <div id="container_loader">
      <div id="loader"></div>
    </div>
  )}else{
  return(
    <FormContainer>
      <Title tag="h1" onClassName="title_h1" value="Alterar dados"/>
      <Title tag="h2" onClassName="title_h2" value="Dados pessoais"/>
      <Form onSubmit={handleSubmit}>
        
        <Label valueName="Nome"/>
        <Input value={firstName} onSetState={setFirstName} type="text" placeholder="Digite seu primeiro nome"/>
        
        <Label valueName="Sobrenome"/>
        <Input value={surname} onSetState={setSurname} type="text" placeholder="Digite seu sobrenome"/>
       
        <Label valueName="Email"/>
        <Input value={email} onSetState={setEmail} type="text" placeholder="Digite seu email"/>
       
        <Label valueName="N??mero de celular"/>
        <NumberFormat className="form__input" format="(##)#####-####" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="tel" placeholder="Numero formato DDD e NUMERO Exemplo: 00123456789"/>
       
        <Title tag="h1" onClassName="title_h1" value="Dados para recebimento"/>
        <Title tag="h2" onClassName="title_h2" value="Caso nao possua empresa, utilize deus dados pessoais"/>
     
        <Label valueName="Nome Completo"/>
        <Input value={name} onSetState={setName} type="text" placeholder="Digite seu nome completo" disabled={true}/>
       
        <Label valueName="Nome comercial"/>
        <Input value={commercialName} onSetState={setCommercionalName} type="text" placeholder="Digite seu nome comercial "/>
        
        <Label valueName="CPF ou CNPJ"/>

        <CpfCnpj
        className="form__input"
        placeholder="Digite um CPF ou CNPJ"
        type="tel"
        value={identity}
        onChange={(event, type: "CPF") => {
          setIdentity(event.target.value);
        }}
      />
      
        <Label valueName="Nome completo do responsavel"/>
        <Input value={responsibleName} onSetState={setResponsibleName} type="text" placeholder="Digite o nome completo do responsavel" disabled={true}/>
        
        <Label valueName="CPF do responsavel"/>
        <Input value={responsibleIdentity} onSetState={setResponsibleIdentity} type="text" placeholder="Digite o cpf completo" disabled={true}/>

        <CpfCnpj
        className="form__input"
        placeholder="Digite um CPF ou CNPJ"
        type="tel"
        value={responsibleIdentity}
        onChange={(event, type: "CPF") => {
          setIdentity(event.target.value);
        }}
      />

        <Title tag="h2" onClassName="title_h2" value="Dados banc??rios"/>
        <Label valueName="C??digo do seu banco"/>
        <Input value={codeBank} onSetState={setCodeBank} type="text" placeholder="Digite o c??digo do seu banco"/>
     
        <Label valueName="Selecione o tipo da sua conta"/>
        <select className="selectRegister" value={codeAccount} onChange={e => setCodeAccount(e.target.value)} >
          <option className="selectOption" value='CC' >Conta Corrente</option>
          <option className="selectOption" value='PP' selected>Conta Poupan??a</option>
        </select>
     
        <Label valueName="N??mero da sua ag??ncia"/>
        <Input value={bankAgency} onSetState={setBankAgency} type="text" placeholder="Digite o n??mero da sua ag??ncia"/>
      
        <Label valueName="D??gito da sua ag??ncia"/>
        <Input value={bankAgencyDigit} onSetState={setBankAgencyDigit} type="text" placeholder="Digite o d??gito da sua ag??ncia"/>
     
        <Label valueName="N??mero da sua conta banc??ria"/>
        <Input value={bankAccount} onSetState={setBankAccount} type="text" placeholder="D??gite o n??mero da sua conta banc??ria"/>
      
        <Label valueName="D??gito da sua conta banc??ria"/>
        <Input value={bankAccountDigit} onSetState={setBankAccountDigit} type="text" placeholder="Digite o d??gito da sua conta banc??ria"/>
     
        {/* <Label valueName="Opera????o da sua conta banc??ria"/>
        <Input value={operation} onSetState={setOperation} type="text" placeholder="Digite a opera????o da sua conta"/> */}

        <Title tag="h2" onClassName="title_h2" value="Endere??o"/>

        <Label valueName="CEP"/>
        <NumberFormat className="form__input" format="########" value={zipCode} onChange={(e) => setZipCode(e.target.value)} type="tel" placeholder="Digite o cep"/>
        
        <Label valueName="Rua"/>
        <Input disabled={true} value={street} onSetState={setStreet} type="text" placeholder="Digite o endere??o da sua rua"/>
      
        <Label valueName="N??mero"/>
        <Input value={number} onSetState={setNumber} type="number" placeholder="Digite o n??mero"/>

        <Label valueName="Complemento"/>
        <Input value={complement} onSetState={setComplement} type="text" placeholder="Digite o complemento"/>
     
        <Label valueName="Bairro"/>
        <Input disabled={true} value={district} onSetState={setDistrict} type="text" placeholder="Digite o bairro"/>

        <Label valueName="Cidade"/>
        <Input disabled={true} value={cityName} onSetState={setCityName} type="text" placeholder="Digite a cidade"/>

        <Label valueName="Estado"/>
        <Input disabled={true} value={stateInitials} onSize={2} onSetState={setStateInitials} type="text" placeholder="Digite a sigla do estado"/>

        <Label valueName="Pa??s"/>
        <Input disabled={true} value={countryName} onSize={3} onSetState={setCountryName} type="text" placeholder="Digite a sigla do p??is"/>
        
        <Label valueName="M??todos que aceita receber pagamento:"/>

        <CheckBox onChecked={checkedBoleto} value="Boleto" onSetChange={setBoleto}/>
        <CheckBox onChecked={checkedCredito} value="Cart??o de cr??dito" onSetChange={setCredito}/>
        <CheckBox onChecked={checkedCripto} value="Criptomoedas" onSetChange={setCripto}/>
        <CheckBox onChecked={checkedDebito} value="Cart??o de d??bito" onSetChange={setDebito}/>
        <CheckBox onChecked={checkedPix} value="Pix" onSetChange={setPix}/> 

        <Button value="Alterar"/>

      </Form>
    </FormContainer>
    )
  }
}
import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Form, { Button, CheckBox, FormContainer, Input, Label, Title } from "../../components/form";
import { AuthContext } from "../../context/AuthContext";



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
  const [countryName, setCountryName] = useState('');

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
    if(zipCode.length === 8){
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
    console.log(validaCpf);
    if(validaCpf === null){
      toast.warning("Insira um cpf/cnpj válido");
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
      phoneNumber,
      identity,
      name,
      commercialName,
      responsibleName,
      responsibleIdentity,
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
       
        <Label valueName="Número de celular"/>
        <Input value={phoneNumber} onSetState={setPhoneNumber} type="number" placeholder="Numero formato DDD e NUMERO Exemplo: 00123456789"/>
       
        <Title tag="h1" onClassName="title_h1" value="Dados para recebimento"/>
        <Title tag="h2" onClassName="title_h2" value="Caso nao possua empresa, utilize deus dados pessoais"/>
     
        <Label valueName="Nome Completo"/>
        <Input value={name} onSetState={setName} type="text" placeholder="Digite seu nome completo" disabled={true}/>
       
        <Label valueName="Nome comercial"/>
        <Input value={commercialName} onSetState={setCommercionalName} type="text" placeholder="Digite seu nome comercial "/>
        
        <Label valueName="CPF ou CNPJ"/>
        <Input value={identity} onSetState={setIdentity} type="number" placeholder="Digite seu cpf ou cnpj sem pontos" disabled={true}/>
      
        <Label valueName="Nome completo do responsavel"/>
        <Input value={responsibleName} onSetState={setResponsibleName} type="text" placeholder="Digite o nome completo do responsavel" disabled={true}/>
        
        <Label valueName="CPF do responsavel"/>
        <Input value={responsibleIdentity} onSetState={setResponsibleIdentity} type="text" placeholder="Digite o cpf completo" disabled={true}/>

        <Title tag="h2" onClassName="title_h2" value="Dados bancários"/>
        <Label valueName="Código do seu banco"/>
        <Input value={codeBank} onSetState={setCodeBank} type="text" placeholder="Digite o código do seu banco"/>
     
        <Label valueName="Selecione o tipo da sua conta"/>
        <select className="selectRegister" value={codeAccount} onChange={e => setCodeAccount(e.target.value)} >
          <option className="selectOption" value='CC' >Conta Corrente</option>
          <option className="selectOption" value='PP' selected>Conta Poupança</option>
        </select>
     
        <Label valueName="Número da sua agência"/>
        <Input value={bankAgency} onSetState={setBankAgency} type="text" placeholder="Digite o número da sua agência"/>
      
        <Label valueName="Dígito da sua agência"/>
        <Input value={bankAgencyDigit} onSetState={setBankAgencyDigit} type="text" placeholder="Digite o dígito da sua agência"/>
     
        <Label valueName="Número da sua conta bancária"/>
        <Input value={bankAccount} onSetState={setBankAccount} type="text" placeholder="Dígite o número da sua conta bancária"/>
      
        <Label valueName="Dígito da sua conta bancária"/>
        <Input value={bankAccountDigit} onSetState={setBankAccountDigit} type="text" placeholder="Digite o dígito da sua conta bancária"/>
     
        {/* <Label valueName="Operação da sua conta bancária"/>
        <Input value={operation} onSetState={setOperation} type="text" placeholder="Digite a operação da sua conta"/> */}

        <Title tag="h2" onClassName="title_h2" value="Endereço"/>

        <Label valueName="CEP"/>
        <Input value={zipCode} onSetState={setZipCode} type="number" placeholder="Digite o cep"/>

        <Label valueName="Rua"/>
        <Input disabled={true} value={street} onSetState={setStreet} type="text" placeholder="Digite o endereço da sua rua"/>
      
        <Label valueName="Número"/>
        <Input value={number} onSetState={setNumber} type="number" placeholder="Digite o número"/>
     
        <Label valueName="Bairro"/>
        <Input disabled={true} value={district} onSetState={setDistrict} type="text" placeholder="Digite o bairro"/>
     
        <Label valueName="Complemento"/>
        <Input value={complement} onSetState={setComplement} type="text" placeholder="Digite o complemento"/>

        <Label valueName="Cidade"/>
        <Input disabled={true} value={cityName} onSetState={setCityName} type="text" placeholder="Digite a cidade"/>

        <Label valueName="Estado"/>
        <Input disabled={true} value={stateInitials} onSize={2} onSetState={setStateInitials} type="text" placeholder="Digite a sigla do estado"/>

        <Label valueName="País"/>
        <Input disabled={true} value={countryName} onSize={3} onSetState={setCountryName} type="text" placeholder="Digite a sigla do páis"/>
        
        <Label valueName="Métodos que aceita receber pagamento:"/>

        <CheckBox onChecked={checkedBoleto} value="Boleto" onSetChange={setBoleto}/>
        <CheckBox onChecked={checkedCredito} value="Cartão de crédito" onSetChange={setCredito}/>
        <CheckBox onChecked={checkedCripto} value="Criptomoedas" onSetChange={setCripto}/>
        <CheckBox onChecked={checkedDebito} value="Cartão de débito" onSetChange={setDebito}/>
        <CheckBox onChecked={checkedPix} value="Pix" onSetChange={setPix}/> 

        <Button value="Alterar"/>

      </Form>
    </FormContainer>
  )
}
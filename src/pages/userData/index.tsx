import { FormEvent, useContext, useEffect, useState } from "react";
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
  const [operation, setOperation] = useState('');

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

  useEffect(() => {
    async function userDataSearch() {
      const response = await userDataGet();
      console.log(response);
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
      setBankAgency(response.merchant.bankAgency);
      setBankAgencyDigit(response.merchant.bankAgencyDigit);
      setBankAccountDigit(response.merchant.bankAccount);
      setBankAgency(response.merchant.bankAgency);
      setBankAgencyDigit(response.merchant.bankAgencyDigit);
      setOperation(response.merchant.operation);
      setStreet(response.address.street);
      setNumber(response.address.number);
      setDistrict(response.address.district);
      setZipCode(response.address.zipCode);
      setComplement(response.address.complement);
      setCityName(response.address.cityName);
      setStateInitials(response.address.stateInitials);
      setCountryName(response.address.countryName);
      setBoleto(response.boleto);
      setCredito(response.credito);
      setDebito(response.debito);
      setPix(response.pix);
      setCripto(response.cripto);
    }
    userDataSearch();
  },[]);
  

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

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
      operation,
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

  return(
    <FormContainer>
      <Title tag="h1" onClassName="title_h1" value="Cadastrar-se"/>
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
        <Input value={name} onSetState={setName} type="text" placeholder="Digite seu nome completo"/>
       
        <Label valueName="Nome comercial"/>
        <Input value={commercialName} onSetState={setCommercionalName} type="text" placeholder="Digite seu nome comercial "/>
        
        <Label valueName="CPF ou CNPJ"/>
        <Input value={identity} onSetState={setIdentity} type="number" placeholder="Digite seu cpf ou cnpj sem pontos"/>
      
        <Label valueName="Nome completo do responsavel"/>
        <Input value={responsibleName} onSetState={setResponsibleName} type="text" placeholder="Digite o nome completo do responsavel"/>
        
        <Label valueName="CPF do responsavel"/>
        <Input value={responsibleIdentity} onSetState={setResponsibleIdentity} type="text" placeholder="Digite o cpf completo"/>

        <Title tag="h2" onClassName="title_h2" value="Dados bancários"/>
        <Label valueName="Código do seu banco"/>
        <Input value={codeBank} onSetState={setCodeBank} type="text" placeholder="Digite o código do seu banco"/>
     
        <Label valueName="Selecione o tipo da sua conta"/>
        <select className="selectRegister"  onChange={e => setCodeAccount(e.target.value)} >
          <option className="selectOption" value="CC" >Conta Corrente</option>
          <option className="selectOption" value="PP" selected>Conta Poupança</option>
        </select>
     
        <Label valueName="Número da sua agência"/>
        <Input value={bankAgency} onSetState={setBankAgency} type="text" placeholder="Digite o número da sua agência"/>
      
        <Label valueName="Dígito da sua agência"/>
        <Input value={bankAgencyDigit} onSetState={setBankAgencyDigit} type="text" placeholder="Digite o dígito da sua agência"/>
     
        <Label valueName="Número da sua conta bancária"/>
        <Input value={bankAccount} onSetState={setBankAccount} type="text" placeholder="Dígite o número da sua conta bancária"/>
      
        <Label valueName="Dígito da sua conta bancária"/>
        <Input value={bankAccountDigit} onSetState={setBankAccountDigit} type="text" placeholder="Digite o dígito da sua conta bancária"/>
     
        <Label valueName="Operação da sua conta bancária"/>
        <Input value={operation} onSetState={setOperation} type="text" placeholder="Digite a operação da sua conta"/>

        <Title tag="h2" onClassName="title_h2" value="Endereço"/>

        <Label valueName="Rua"/>
        <Input value={street} onSetState={setStreet} type="text" placeholder="Digite o endereço da sua rua"/>
      
        <Label valueName="Número"/>
        <Input value={number} onSetState={setNumber} type="number" placeholder="Digite o número"/>
     
        <Label valueName="Bairro"/>
        <Input value={district} onSetState={setDistrict} type="text" placeholder="Digite o bairro"/>
      
        <Label valueName="CEP"/>
        <Input value={zipCode} onSetState={setZipCode} type="number" placeholder="Digite o cep"/>
     
        <Label valueName="Complemento"/>
        <Input value={complement} onSetState={setComplement} type="text" placeholder="Digite o complemento"/>

        <Label valueName="Cidade"/>
        <Input value={cityName} onSetState={setCityName} type="text" placeholder="Digite a cidade"/>

        <Label valueName="Estado"/>
        <Input value={stateInitials} onSize={2} onSetState={setStateInitials} type="text" placeholder="Digite a sigla do estado"/>

        <Label valueName="País"/>
        <Input value={countryName} onSize={3} onSetState={setCountryName} type="text" placeholder="Digite a sigla do páis"/>
        
        <Label valueName="Métodos que aceita receber pagamento:"/>

        <CheckBox value="Boleto" onSetChange={setBoleto}/>
        <CheckBox value="Cartão de crédito" onSetChange={setCredito}/>
        <CheckBox value="Criptomoedas" onSetChange={setCripto}/>
        <CheckBox value="Cartão de débito" onSetChange={setDebito}/>
        <CheckBox value="Pix" onSetChange={setPix}/> 

        <Button value="Cadastrar"/>

      </Form>
    </FormContainer>
  )
}
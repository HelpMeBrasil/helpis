import { useState } from "react";
import Form, { Button, FormContainer, Input, Label, Title } from "../../components/form";


export function Register() {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [identity, setIdentity] = useState('');

  //Merchant
  const [name, setName] = useState('');
  const [commercialName, setCommercionalName] = useState('');
  const [identityCompany, setIdentityCompany] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [responsibleIdentity, setResponsibleIdentity] = useState('');
  const [emailCompany, setEmailCompany] = useState('');

  //BankData
  const [codeBank , setCodeBank] = useState('');
  const [codeAccount, setCodeAccount] = useState('');

  //Account
  const [bankAgency, setBankAgency] = useState('');
  const [bankAgencyDigit, setBankAgencyDigit] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankAccountDigit, setBankAccountDigit] = useState('');
  const [operation, setoperation] = useState('');

  //Address
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [complement, setComplement] = useState('');
  const [cityName, setCityName] = useState('');
  const [stateInitials, setStateInitials] = useState('');
  const [countryName, setCountryName] = useState('');

  return(
    <FormContainer>
      <Title tag="h1" onClassName="title_h1" value="Cadastrar-se"/>
      <Title tag="h2" onClassName="title_h2" value="Dados pessoais"/>
      <Form >
        <Label valueName="Nome"/>
        <Input value={firstName} onSetState={setFirstName} type="text" placeholder="Digite seu primeiro nome"/>
        
        <Label valueName="Sobrenome"/>
        <Input value={surname} onSetState={setSurname} type="text" placeholder="Digite seu sobrenome"/>
       
        <Label valueName="Nome de usuário"/>
        <Input value={username} onSetState={setUsername} type="text" placeholder="Digite seu nome de usuário"/>
       
        <Label valueName="Email"/>
        <Input value={email} onSetState={setEmail} type="text" placeholder="Digite seu email"/>
       
        <Label valueName="Número de celular"/>
        <Input value={phoneNumber} onSetState={setPhoneNumber} type="number" placeholder="Numero formato DDD e NUMERO Exemplo: 00123456789"/>
        
        <Label valueName="Senha"/>
        <Input value={password} onSetState={setPassword} type="password" placeholder="Digite sua senha"/>
       
        <Label valueName="CPF"/>
        <Input value={identity} onSetState={setIdentity} type="number" placeholder="Digite seu CPF apenas numero"/>

        <Title tag="h1" onClassName="title_h1" value="Dados para recebimento"/>
        <Title tag="h2" onClassName="title_h2" value="Caso nao possua empresa, utilize deus dados pessoais"/>
     
        <Label valueName="Nome Completo"/>
        <Input value={name} onSetState={setName} type="text" placeholder="Digite seu nome completo"/>
       
        <Label valueName="Nome comercial"/>
        <Input value={commercialName} onSetState={setCommercionalName} type="text" placeholder="Digite seu nome comercial "/>
        
        <Label valueName="CPF ou CNPJ"/>
        <Input value={identityCompany} onSetState={setIdentityCompany} type="number" placeholder="Digite seu cpf ou cnpj sem pontos"/>
      
        <Label valueName="Nome completo do responsavel"/>
        <Input value={responsibleName} onSetState={setResponsibleName} type="text" placeholder="Digite o nome completo do responsavel"/>
        
        <Label valueName="CPF do responsavel"/>
        <Input value={responsibleIdentity} onSetState={setResponsibleIdentity} type="text" placeholder="Digite o cpf completo"/>
   
        <Label valueName="Email da empresa ou pessoal"/>
        <Input value={emailCompany} onSetState={setEmailCompany} type="text" placeholder="Digite o email da empresa ou pessoal"/>

        <Title tag="h2" onClassName="title_h2" value="Dados bancários"/>
        <Label valueName="Código do seu banco"/>
        <Input value={codeBank} onSetState={setCodeBank} type="text" placeholder="Digite o código do seu banco"/>
     
        <Label valueName="Selecione o tipo da sua conta"/>
        <select value={codeAccount} onChange={e => setCodeAccount(e.target.value)} >
          <option value="CC">Conta Corrente</option>
          <option value="PP" selected>Conta Poupança</option>
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
        <Input value={operation} onSetState={setoperation} type="text" placeholder="Digite seu nome completo"/>

        <Title tag="h2" onClassName="title_h2" value="Endereço"/>

        <Label valueName="Rua"/>
        <Input value={street} onSetState={setStreet} type="text" placeholder="Digite o endereço da sua rua"/>
      
        <Label valueName="Número"/>
        <Input value={number} onSetState={setNumber} type="number" placeholder="Digite o nímero"/>
     
        <Label valueName="Bairro"/>
        <Input value={district} onSetState={setDistrict} type="text" placeholder="Digite o bairro"/>
      
        <Label valueName="CEP"/>
        <Input value={zipCode} onSetState={setZipCode} type="number" placeholder="Digite o cep"/>
     
        <Label valueName="Cidade"/>
        <Input value={cityName} onSetState={setCityName} type="number" placeholder="Digite o complemento"/>

        <Label valueName="Estado"/>
        <Input value={stateInitials} onSize={2} onSetState={setStateInitials} type="number" placeholder="Digite a sigla"/>

        <Label valueName="País"/>
        <Input value={countryName} onSetState={setCountryName} type="number" placeholder="Digite o país"/>

    
        <Button value="Cadastrar"/>

      </Form>
    </FormContainer>
  )
}
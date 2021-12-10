import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Form, { Button, CheckBox, FormContainer, Input, Label, Title } from "../../components/form";
import { AuthContext } from "../../context/AuthContext";
import './styles.scss'

export function Register() {
  const { register } = useContext(AuthContext);

  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [identity, setIdentity] = useState('');

  //Merchant
  const [name, setName] = useState('');
  const [commercialName, setCommercionalName] = useState('');
  const [responsibleName, setResponsibleName] = useState('');
  const [responsibleIdentity, setResponsibleIdentity] = useState('');

  //BankData
  const [codeBank , setCodeBank] = useState('');
  const [codeAccount, setCodeAccount] = useState("CC");

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
  const countryName = 'BR';


  const [boleto, setBoleto] = useState('');
  const [credito, setCredito] = useState('');
  const [debito, setDebito] = useState('');
  const [pix, setPix] = useState('');
  const [cripto, setCripto] = useState('');

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
        password,
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
      await register(data);
    }
  }
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
        
        <Label valueName="Senha"/>
        <Input value={password} onSetState={setPassword} type="password" placeholder="Digite sua senha"/>
       
        <Title tag="h1" onClassName="title_h1" value="Dados para recebimento"/>
        <Title tag="h2" onClassName="title_h2" value="Caso nao possua empresa, utilize deus dados pessoais"/>
     
        <Label valueName="Nome Completo"/>
        <Input value={name} onSetState={setName} type="text" placeholder="Digite seu nome completo"/>
       
        <Label valueName="Nome comercial"/>
        <Input value={commercialName} onSetState={setCommercionalName} type="text" placeholder="Digite seu nome comercial "/>
        
        <Label valueName="CPF ou CNPJ"/>
        <Input onSize={3} value={identity} onSetState={setIdentity} type="number" placeholder="Digite seu cpf ou cnpj sem pontos"/>
      
        <Label valueName="Nome completo do responsavel"/>
        <Input value={responsibleName} onSetState={setResponsibleName} type="text" placeholder="Digite o nome completo do responsavel"/>
        
        <Label valueName="CPF do responsavel"/>
        <Input value={responsibleIdentity} onSetState={setResponsibleIdentity} type="text" placeholder="Digite o cpf completo"/>

        <Title tag="h2" onClassName="title_h2" value="Dados bancários"/>
        <Label valueName="Código do seu banco"/>
        <Input value={codeBank} onSetState={setCodeBank} type="text" placeholder="Digite o código do seu banco"/>
     
        <Label valueName="Selecione o tipo da sua conta"/>
        <select className="selectRegister"  defaultValue={codeBank} onChange={e => setCodeAccount(e.target.value)} >
          <option className="selectOption"  value="CC" >Conta Corrente</option>
          <option className="selectOption" value="PP" >Conta Poupança</option>
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
        <Input disabled={true} value={street}  type="text" placeholder="Digite o endereço da sua rua"/>
      
        <Label valueName="Número"/>
        <Input value={number} onSetState={setNumber} type="number" placeholder="Digite o número"/>

        <Label valueName="Complemento"/>
        <Input value={complement} onSetState={setComplement} type="text" placeholder="Digite o complemento"/>
     
        <Label valueName="Bairro"/>
        <Input disabled={true} value={district}  type="text" placeholder="Digite o bairro"/>
      
        <Label valueName="Cidade"/>
        <Input disabled={true} value={cityName}  type="text" placeholder="Digite a cidade"/>

        <Label valueName="Estado"/>
        <Input disabled={true} value={stateInitials} onSize={2}  type="text" placeholder="Digite a sigla do estado"/>

        <Label valueName="País"/>
        <Input disabled={true} value={countryName} onSize={3}  type="text" placeholder="Digite a sigla do páis"/>
        
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
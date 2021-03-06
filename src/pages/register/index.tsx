import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Form, { Button, CheckBox, FormContainer, Input, Label, Title } from "../../components/form";
import { AuthContext } from "../../context/AuthContext";
import './styles.scss'
import NumberFormat from 'react-number-format';
import CpfCnpj from "../../utils/cpf";


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
        password,
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

      await register(data);
    }
  }
  useEffect(() => {
    
    async function getZipCode(){
    if(zipCode.trim().length === 8){
      const response = await axios.get("https://viacep.com.br/ws/"+zipCode+"/json/", { headers: { 'Content-Type': 'application/json', }});
      
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
       
        {/* <Label valueName="N??mero de celular"/>
        <Input value={phoneNumber} onSetState={setPhoneNumber} type="number" placeholder="Numero formato DDD e NUMERO Exemplo: 00123456789"/> */}
        
        <Label valueName="N??mero de celular"/>
        <NumberFormat className="form__input" format="(##)#####-####" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="tel" placeholder="Numero formato DDD e NUMERO Exemplo: 00123456789"/>

        <Label valueName="Senha"/>
        <Input value={password} onSetState={setPassword} type="password" placeholder="Digite sua senha"/>
       
        <Title tag="h1" onClassName="title_h1" value="Dados para recebimento"/>
        <Title tag="h2" onClassName="title_h2" value="Caso nao possua empresa, utilize deus dados pessoais"/>
     
        <Label valueName="Nome Completo"/>
        <Input value={name} onSetState={setName} type="text" placeholder="Digite seu nome completo"/>
       
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
        <Input value={responsibleName} onSetState={setResponsibleName} type="text" placeholder="Digite o nome completo do responsavel"/>
        
        <Label valueName="CPF do responsavel"/>
        {/* <Input value={responsibleIdentity} onSetState={setResponsibleIdentity} type="text" placeholder="Digite o cpf completo"/> */}

        <CpfCnpj
        className="form__input"
        placeholder="Digite um CPF ou CNPJ"
        type="tel"
        value={responsibleIdentity}
        onChange={(event, type: "CPF") => {
          setResponsibleIdentity(event.target.value);

        }}
      />


        <Title tag="h2" onClassName="title_h2" value="Dados banc??rios"/>
        <Label valueName="C??digo do seu banco"/>
        <Input value={codeBank} onSetState={setCodeBank} type="text" placeholder="Digite o c??digo do seu banco"/>
     
        <Label valueName="Selecione o tipo da sua conta"/>
        <select className="selectRegister"  defaultValue={codeBank} onChange={e => setCodeAccount(e.target.value)} >
          <option className="selectOption"  value="CC" >Conta Corrente</option>
          <option className="selectOption" value="PP" >Conta Poupan??a</option>
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
        <Input disabled={true} value={street}  type="text" placeholder="Digite o endere??o da sua rua"/>
      
        <Label valueName="N??mero"/>
        <Input value={number} onSetState={setNumber} type="number" placeholder="Digite o n??mero"/>

        <Label valueName="Complemento"/>
        <Input value={complement} onSetState={setComplement} type="text" placeholder="Digite o complemento"/>
     
        <Label valueName="Bairro"/>
        <Input disabled={true} value={district}  type="text" placeholder="Digite o bairro"/>
      
        <Label valueName="Cidade"/>
        <Input disabled={true} value={cityName}  type="text" placeholder="Digite a cidade"/>

        <Label valueName="Estado"/>
        <Input disabled={true} value={stateInitials} onSize={2}  type="text" placeholder="Digite a sigla do estado"/>

        <Label valueName="Pa??s"/>
        <Input disabled={true} value={countryName} onSize={3}  type="text" placeholder="Digite a sigla do p??is"/>
        
        <Label valueName="M??todos que aceita receber pagamento:"/>

        <CheckBox value="Boleto" onSetChange={setBoleto}/>
        <CheckBox value="Cart??o de cr??dito" onSetChange={setCredito}/>
        <CheckBox value="Criptomoedas" onSetChange={setCripto}/>
        <CheckBox value="Cart??o de d??bito" onSetChange={setDebito}/>
        <CheckBox value="Pix" onSetChange={setPix}/> 

        <Button value="Cadastrar"/>
        

      </Form>
    </FormContainer>
  )
}
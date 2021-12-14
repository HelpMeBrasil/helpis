import { FormEvent, useState, useContext } from "react";
import Form, { Button, FormContainer, Input, InputImg, Label, Textarea, Title } from "../../../components/form";
import { AuthContext } from "../../../context/AuthContext";
import CurrencyInput from "../../../utils/react-currency-input-master/src";


export function NewCampaign(){
  
  const { addCampaign } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState<any>();
  const [targetValue, setTargetValue] = useState('');

    
    const toBase64 = (file: File) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });

    async function handleSubmit(event: FormEvent){
      event.preventDefault();
        
        if(img === undefined){
        const data = {
          title,
          description,
          targetValue: Number(parseFloat(targetValue.replaceAll("R$","").replaceAll(",", "")).toFixed(2)),
          }
          await addCampaign(data);
        }else{
          const image = await toBase64(img[0]) as string;
          const data = {
          title,
          description,
          image,
          targetValue: Number(parseFloat(targetValue.replaceAll("R$","").replaceAll(",", "")).toFixed(2)),
          }
          await addCampaign(data);
        }
      

    }

    //<Input value={targetValue} onSetState={setTargetValue} type="text" placeholder="Digite o valor"/>
    //                <NumberFormat placeholder="Exemplo: 10,000.57" className="form__input" value={targetValue} thousandSeparator={true} prefix={'R$'} onChange={(e)=> setTargetValue(e.target.value)} />

  return(
    <FormContainer>
          <Title tag="h1" onClassName="title_h1" value="Criar uma campanha de doação"/>
          <Form onSubmit={handleSubmit}>
                <Label valueName="Título da campanha"/>
                <Input value={title} onSetState={setTitle} type="text" placeholder="Digite o título"/>
                <Label valueName="Descrição da campanha"/>
                <Textarea value={description} onSetState={setDescription}/>
                <Label valueName="Digite o valor da meta"/>
                {/* <input value={targetValue} type="text" className="form__input" onChange={e => handleChange(e)} /> */}
                <CurrencyInput className="form__input" prefix="R$" value={targetValue} onChangeEvent={(e: any) => setTargetValue(e.target.value)}  required />
                <Label valueName="Escolha uma imagem para a campanha"/>
                <InputImg required={true} name="formInputImg "id="formInputImg" accept="image/x-png,image/gif,image/jpeg" type="file" onSetState={setImg}/>
                <Button value="Salvar"/>
          </Form>
          </FormContainer>
  )
}
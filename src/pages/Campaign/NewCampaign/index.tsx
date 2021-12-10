import { FormEvent, useState, useContext, ChangeEvent } from "react";
import { toast } from "react-toastify";
import Form, { Button, FormContainer, Input, InputImg, Label, Textarea, Title } from "../../../components/form";
import { AuthContext } from "../../../context/AuthContext";


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
      if(!(targetValue.startsWith("."))){
        if(img === undefined){
        const data = {
          title,
          description,
          targetValue: parseInt(targetValue.replace("R$ ","")),
          }
          await addCampaign(data);
        }else{
          const image = await toBase64(img[0]) as string;
          const data = {
          title,
          description,
          image,
          targetValue: parseInt(targetValue.replace("R$ ","")),
          }
          await addCampaign(data);
        }
      }
      else{
        toast.warning("Metas devem ser 1 real ou mais")
      }
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>){

      var valor = e.target.value;

      valor = valor + '';
      let valorInt = parseInt(valor.replace(/[\D]+/g, ''));
      valor = valorInt + '';
      let valorFinal = valor.replace(/([0-9]{2})$/g, ".$1");
      e.target.value = valorFinal;
      console.log(e.target.value);
      if(valor === 'NaN') e.target.value = '';
      setTargetValue("R$ "+ e.target.value);
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
                <input value={targetValue} type="text" className="form__input" onChange={e => handleChange(e)} />
                <Label valueName="Escolha uma imagem para a campanha"/>
                <InputImg name="formInputImg "id="formInputImg" accept="image/x-png,image/gif,image/jpeg" type="file" onSetState={setImg}/>
                <Button value="Criar"/>
          </Form>
          </FormContainer>
  )
}
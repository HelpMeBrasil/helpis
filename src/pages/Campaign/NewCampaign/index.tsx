import { FormEvent, useState, useContext } from "react";
import Form, { Button, FormContainer, Input, InputImg, Label, Textarea, Title } from "../../../components/form";
import { AuthContext } from "../../../context/AuthContext";


export function NewCampaign(){
  
  const { addCampaign } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState<any>();

    
    const toBase64 = (file: File) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });

    async function handleSubmit(event: FormEvent){
    event.preventDefault();
    const image = await toBase64(img[0]) as string;
    console.log(image);
    const data = {
      title,
      description,
      image,
    }

    await addCampaign(data);

    }


  return(
    <FormContainer>
          <Title tag="h1" onClassName="title_h1" value="Criar uma campanha de doação"/>
          <Form onSubmit={handleSubmit}>
                <Label valueName="Título da campanha"/>
                <Input value={title} onSetState={setTitle} type="text" placeholder="Digite o título"/>
                <Label valueName="Descrição da campanha"/>
                <Textarea value={description} onSetState={setDescription}/>
                <Label valueName="Escolha uma imagem para a campanha"/>
                <InputImg name="formInputImg "id="formInputImg" accept="image/x-png,image/gif,image/jpeg" type="file" onSetState={setImg}/>
                <Button value="Criar"/>
          </Form>
          </FormContainer>
  )
}
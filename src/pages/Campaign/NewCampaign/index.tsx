import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import Form, { Button, FormContainer, Input, InputImg, Label, Textarea, Title } from "../../../components/form";


export function NewCampaign(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [textarea, setTextarea] = useState('');
  const [img, setImg] = useState<any>();

  function getBase64(file:any, cb:any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };    
  }

    function handleSubmit(event: FormEvent){
    event.preventDefault();
    console.log(img[0]);

    }


  return(
    <FormContainer>
          <Title tag="h1" onClassName="title_h1" value="Criar uma campanha de doação"/>
          <Form onSubmit={handleSubmit}>
                <Label valueName="Título da campanha"/>
                <Input value={title} onSetState={setTitle} type="text" placeholder="Digite o título"/>
                <Label valueName="Descrição da campanha"/>
                <Input value={description} onSetState={setDescription} type="text" placeholder="Digite a descrição"/>
                <Textarea value={textarea} onSetState={setTextarea}/>

                <Label valueName="Escolha uma imagem para a campanha"/>
                <InputImg name="formInputImg "id="formInputImg" accept="image/x-png,image/gif,image/jpeg" type="file" onSetState={setImg}/>
                <Button value="Criar"/>
          </Form>
          </FormContainer>
  )
}
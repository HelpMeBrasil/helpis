import { useState } from "react";
import { Link } from "react-router-dom";
import Form, { Button, FormContainer, Input, InputImg, Label, Textarea, Title } from "../../../components/form";


export function NewCampaign(){
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [textarea, setTextarea] = useState('');
  const [img, setImg] = useState<any>();
  return(
    <FormContainer>
          <Title tag="h1" onClassName="title_h1" value="Criar uma campanha de doação"/>
          <Form >
                <Label valueName="Título da campanha"/>
                <Input value={title} onSetState={setTitle} type="text" placeholder="Digite o título"/>
                <Label valueName="Descrição da campanha"/>
                <Input value={description} onSetState={setDescription} type="text" placeholder="Digite a descrição"/>
                <Textarea value={textarea} onSetState={setTextarea}/>

                <Label valueName="Escolha uma imagem para a campanha"/>
                <InputImg accept="image/x-png,image/gif,image/jpeg" type="file" onSetState={setImg}/>
                <Button value="Criar"/>
          </Form>
          </FormContainer>
  )
}
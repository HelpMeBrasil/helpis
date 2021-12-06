import { FormEvent, useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Form, { Button, FormContainer, Input, InputImg, Label, Textarea, Title } from "../../../components/form";
import { AuthContext } from "../../../context/AuthContext";


export function EditCampaign(){
  
  const { viewCampaign, editCampaign } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState<any>();
  const { hash } = useParams<string>();
  const [ hashFix, setHashFix] = useState('');
  console.log(hash)
  


    const toBase64 = (file: File) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
  });

  useEffect(() => {
    async function searchCampaign() {
        const response = await viewCampaign(hash!)
        setTitle(response.title);
        setDescription(response.description);
        setImg(response.image);
        setHashFix(response.hash);
        }
    searchCampaign();
    },[])

    async function handleSubmit(event: FormEvent){
    event.preventDefault();
    const image = await toBase64(img[0]) as string;
    const data = {
      hash: hashFix,
      title,
      description,
      image,
    }
    editCampaign(data);
    }


  return(
    <FormContainer>
          <Title tag="h1" onClassName="title_h1" value="Criar uma campanha de doação"/>
          <Form onSubmit={handleSubmit}>
                <Label valueName="Título da campanha"/>
                <Input value={title} onSetState={setTitle} type="text" placeholder="Digite o título"/>
                <Label valueName="Descrição da campanha"/>
                <Textarea value={description} onSetState={setDescription}/>
                <Label valueName="Escolha a mesma ou nova imagem para a campanha"/>
                <InputImg name="formInputImg "id="formInputImg" accept="image/x-png,image/gif,image/jpeg" type="file" onSetState={setImg}/>
                <Button value="Criar"/>
          </Form>
          </FormContainer>
  )
}
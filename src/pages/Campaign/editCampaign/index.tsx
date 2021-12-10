import { FormEvent, useState, useContext, useEffect } from "react";
import NumberFormat from "react-number-format";
import { useParams } from "react-router-dom";
import Form, { Button, FormContainer, Input, InputImg, Label, Textarea, Title } from "../../../components/form";
import { AuthContext } from "../../../context/AuthContext";


export function EditCampaign(){
  
  const { viewCampaign, editCampaign } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState<FileList>({} as FileList);
  const { hash } = useParams<string>();
  const [ hashFix, setHashFix] = useState('');
  const [targetValue, setTargetValue] = useState('');
  


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
        // const file = dataURLtoFile(response.image, "imagemAtual")
        // let list = new DataTransfer();
        // list.items.add(file);
        // let myFileList = list.files;
        //setImg(response.image);
        setHashFix(response.hash);
        setLoading(false)
        }
    searchCampaign();
    },[hash, viewCampaign])

    async function handleSubmit(event: FormEvent){
    event.preventDefault();
    if(img === undefined){
      const data = {
      hash: hashFix,
      title,
      description,
      targetValue: parseInt(targetValue.replace("R$","")),
      }
      editCampaign(data);
    }else{
      const image = await toBase64(img![0]) as string;
      const data = {
        hash: hashFix,
        title,
        description,
        image,
        targetValue: parseInt(targetValue.replace("R$","")),
        }
        editCampaign(data);
    }
    
    }

    const [loading, setLoading] = useState(true);
    if(loading === true){
    return(
      <div id="loader"></div>
    )}else{
    return(
      <FormContainer>
            <Title tag="h1" onClassName="title_h1" value="Criar uma campanha de doação"/>
            <Form onSubmit={handleSubmit}>
                  <Label valueName="Título da campanha"/>
                  <Input value={title} onSetState={setTitle} type="text" placeholder="Digite o título"/>
                  <Label valueName="Descrição da campanha"/>
                  <Textarea value={description} onSetState={setDescription}/>
                  <Label valueName="Digite o valor da meta"/>
                  <NumberFormat placeholder="Exemplo: 10,000.57" className="form__input" value={targetValue} thousandSeparator={true} prefix={'R$'} onChange={(e)=> setTargetValue(e.target.value)} />
                  <Label valueName="Caso nao escolha imagem, ira manter a imagem antiga"/>
                  <InputImg name="formInputImg "id="formInputImg" accept="image/x-png,image/gif,image/jpeg" type="file" onSetState={setImg}/>
                  <Button value="Criar"/>
            </Form>
            </FormContainer>
    )
    }
}
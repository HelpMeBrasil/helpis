import { FormEvent, useState, useContext, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
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

  function handleChange(e: ChangeEvent<HTMLInputElement>){

        var valor = e.target.value;

        valor = valor + '';
        let valorInt = parseInt(valor.replace(/[\D]+/g, ''));
        valor = valorInt + '';
        let valorFinal = valor.replace(/([0-9]{2})$/g, ".$1");
        e.target.value = valorFinal;
        console.log(e.target.value);
        if(valor === 'NaN') e.target.value = '';
        setTargetValue("R$ "+e.target.value);

  }

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
    if(targetValue.startsWith(".")){
      if(img === undefined){
        const data = {
        hash: hashFix,
        title,
        description,
        targetValue: parseInt(targetValue.replace("R$ ","")),
        }
        editCampaign(data);
      }else{
        const image = await toBase64(img![0]) as string;
        const data = {
          hash: hashFix,
          title,
          description,
          image,
          targetValue: parseInt(targetValue.replace("R$ ","")),
          }
          editCampaign(data);
      }
    } else{
      toast.warning("Metas devem ser 1 real ou mais")
    }
    
    }

    // function formatarMoeda() {
    //   var elemento! = document('valor')?.nodeValue;
    //   var valor = elemento;

    //   valor = valor + '';
    //   valor = parseInt(valor.replace(/[\D]+/g, ''));
    //   valor = valor + '';
    //   valor = valor.replace(/([0-9]{2})$/g, ",$1");

    //   if (valor.length > 6) {
    //       valor = valor.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
    //   }

    //   elemento.value = valor;
    //   if(valor == 'NaN') elemento.value = '';
    // }
    //                  <NumberFormat placeholder="Exemplo: 10,000.57" className="form__input" value={targetValue} thousandSeparator={true} prefix={'R$'} onChange={(e)=> setTargetValue(e.target.value)} />


    const [loading, setLoading] = useState(true);
    if(loading === true){
    return(
      <div id="container_loader">
      <div id="loader"></div>
      </div>
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
                  <input value={targetValue} type="text" className="form__input" onChange={e => handleChange(e)} />
                  <Label valueName="Caso nao escolha imagem, ira manter a imagem antiga"/>
                  <InputImg name="formInputImg "id="formInputImg" accept="image/x-png,image/gif,image/jpeg" type="file" onSetState={setImg}/>
                  <Button value="Criar"/>
            </Form>
            </FormContainer>
    )
    }
}
import { ContentLarge } from '../../../components/contentLarge';
import { Title } from '../../../components/form';


export function NotFound() {

  return(
    <>
    <ContentLarge>
        <Title tag="h1" onClassName="title_h1" value="Página não encontrada"/>
    </ContentLarge>
    </>
  )
}
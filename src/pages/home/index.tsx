import { ContentLarge } from "../../components/contentLarge";
import { Title } from "../../components/form";



export function Home() {
  return(
    <>
    <ContentLarge>
        <Title tag="h1" onClassName="title_h1" value="Bem vindo ao Helpis"/>
    </ContentLarge>
    <ContentLarge>
        <Title tag="h2" onClassName="title_h2" value="Seja a difença na vida de alguém"/>
    </ContentLarge>
    </>
  )
}
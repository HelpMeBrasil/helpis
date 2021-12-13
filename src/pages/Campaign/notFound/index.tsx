import { ContentLarge } from '../../../components/contentLarge';
import { Title } from '../../../components/form';
import './styles.scss';

export function NotFound() {

  return(
    // <>
    // <ContentLarge>
    //     <Title tag="h1" onClassName="title_h1" value="Página não encontrada"/>
    // </ContentLarge>
    // </>
  <div id="notfound">
		<div className="notfound">
			<div className="notfound-404">
				<h1>:(</h1>
			</div>
			<h2>404 - Página não encontrada</h2>
			<p>A página que você tentou acessar pode ter sido removida ou não existe.</p>
			<a href="/Home">Voltar à página inicial</a>
		</div>
	</div>
  )
}
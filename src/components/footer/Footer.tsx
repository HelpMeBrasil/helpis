import './styles.scss';

export function Footer(){
    return (
        <>
    <footer className="footer-distributed">

        <div className="footer-left">
            <p className="footer-links">
                <a href="/Home" className="link-1">Home</a>
                <a href="#">Blog</a>
                <a href="#">Taxas</a>
                <a href="#">Sobre</a>
                <a href="#">Faq</a>
                <a href="#">Contato</a>
            </p>
        </div>

        <div className="footer-center"> 
            <img className='footer_img' src="favicon.png"></img>
        </div>

        <div className="footer-right">
            <p className="footer-company-about">
            <span>Sobre</span>
                A Helpis Crowdfunding é uma empresa que facilita o recebimento e envio de valores à pessoas físicas ou jurídicas que precisem receber dinheiro em forma de doações.
            </p>
        </div>
            <span className="footer-company-name">Helpis Crowdfunding - 2021 © Todos os direitos reservados.</span>
    </footer>
    </>
    );
  }
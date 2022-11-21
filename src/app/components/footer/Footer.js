import React from 'react';



const Footer = () => {
  return (
    <footer id="sc-footer">
      <div id="footer" className='uk-margin-large-top'>
        <h3 className=" uk-h4 uk-text-center-medium uk-margin-large-top ">
          <span> © {new Date().getFullYear()} - AMGEN - Todos os direitos reservados - Política de Privacidade - Termos de Uso</span>
        </h3>
      </div>
    </footer>
  );
};

Footer.propTypes = {
};

export default Footer;

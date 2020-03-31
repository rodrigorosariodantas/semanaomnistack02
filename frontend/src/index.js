import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';//1- importando o arquivo App.js


ReactDOM.render(//2- renderizando, colocando em tela, o App
  <React.StrictMode>
    <App /> 
  </React.StrictMode>, //o App aqyui es un componente do react(primeira letra maiucula)
  document.getElementById('root') //aqui colocando o App dentro do Id root 
  //3- um componente no react nada mais é do que algo que retorna HTML
  //qd um elemento HTML está escrito dentro de javascript a gente chama de JSX(Javascript SML)
  //propiedad en JS eh quase a mesma coisa de atributo em HTML (id eh um atributo do HTML)
  //qd a gente tem um codigo que vai se repetir muitas vezes em uma pagina a gente cria um componente
  //4- neste caso isolaremos o Header criando o arquivo Header.js
);



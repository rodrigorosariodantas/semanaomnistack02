//arquivo principal da app

import React from 'react';
//import { Text, View } from 'react-native';2- e pode retirar o que tiver a ver com rectNative
import Routes from './src/routes';//1- importa as rotas
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'

export default function App() {
  return (//3- deixar apenas a exportacao das rotas
    <Routes />
  );
}


//2- retira a parte de estilizacao
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

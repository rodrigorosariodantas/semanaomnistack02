import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';//1- importar o modo de navegacao stackNavigation
import { NavigationContainer } from '@react-navigation/native';//5- como o BrowserRouter
const AppStack = createStackNavigator();//2- criar a variavel stack navigatio
                    //dentro do AppStack iremos cadastrar nossas rotas
import Incidents from './pages/Incidents';
import Detail from './pages/Detail';//9-importa as paginas para por nos componetes AppStack.Scren


export default function Routes() {//3- exportar um componente chamado Routes
    return (//4- retornar as nossas rotas
        //6-NavigationContainer sempre vai em volta de todas as rotas
        //7- AppStack.Scree para cada uma das rotas que add na aplicacao
        //8- recebe propriedade chamada componente que eh o componente da page
        //11- para tirar o padrao do cabecalho
        <NavigationContainer>
            <AppStack.Navigator screenOptions= {{ headerShown: false }}>
                <AppStack.Screen name='Incidents' component={Incidents} />
                <AppStack.Screen name='Detail' component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

//10- agora importamos isso dentro de nosso App.js
//12- agora ir estilizar a pagina Incidents


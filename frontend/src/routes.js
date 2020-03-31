import React from 'react';//2 - importa React
import { BrowserRouter, Route, Switch } from 'react-router-dom';//1-importa o BrowserRouter
import Logon from './pages/Logon';//3importa nossa primeira page Logon
import Register from './pages/Register'//8importa a rota de registro
import Profile from './pages/Profile';//10- importa a rota profile
import NewIncident from './pages/NewIncident'
export default function Routes(){//4-como as rotas tb serao componentes exportamos a funcao
    return (//5- o BrowserRouter precisa ficar ao redor de tudo
            //o Switch garante que apenas um rota eh executada por vez
            //path eh o caminho que vamos utilizar
            //6- cria a rota principal '/' e passa a propiedade exact
            //9- cria a rota de registro
            //11- cri a rota profile
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Logon} />
                <Route path='/register' component={Register} />
                <Route path='/profile' component={Profile} />
                <Route path='/incidents/new' component={NewIncident} />
            </Switch>
        
        </BrowserRouter>
    );
}

//7- feito a rota vai ao App.js
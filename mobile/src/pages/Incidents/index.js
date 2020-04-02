import React, { useEffect, useState } from 'react';//1- importar o React
                                        //17- carrega o useEffect para carregar informcao assim q o componente eh exibido em tela
                                        //23- cria o useState
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';//2-importar a View já q aqui nao tem div
                                                //importa o Image e o Text para poder usalos
                                                //7- TouchableOpacity um botao sem estilizacao padrao, torna qualquer coisa clicavel e diminui a opacidade qd clica
                                                //10- FlatListpara fazer as listagens
import  logoImg from '../../assets/logo.png';//nao precisa passar o x2, pq vai imortar a logo no melhor formato
import styles from './styles'
import { Feather } from '@expo/vector-icons';//9- importando icones
import { useNavigation } from '@react-navigation/native';//para poder navegar entre as paginas
import api from '../../Services/api';//21-importa api

export default function Incidents(){//3- criar o nosso componente
    const [incidents, setIncidents] = useState([]);//24- cria as variaveis de estado, como no React, com array vazio
    const navigation = useNavigation();//11-chama o use navigation como o useHistory da web
    const [total, setTotal] = useState(0);//32- cria um novo estado que vai armazenar o total de casos
    const [page, setPage] = useState(1);//34- controlar a paginacao iniciando na page 1
    const [loading, setLoading] = useState(false);//35-cria tb un estado de loading pra guardar os dados e evitar q eles sejam buscados novamente, carregar uma pagina por vez

function navigateToDetail(incident) { //35- poe o parametro incident
    navigation.navigate('Detail', { incident });//12-chama a funcao para levar p rota Detail
}

async function loadIncidents() {//19- cria a funcao loadIncidents
if (loading) { //36se o loading for true dar un return para evitar q outra requisicao seja feita 
    return;
}   

if (total > 0 && incident.length == total) {
    return;//37 se tudo já foi carragado nao precisa carregar mais
}

setLoading(true)//38

    const response = await api.get('incidents', { //22 chama a api peando a rota incidents
        params: { page }//40- passar a pagina para a api
    });

    setIncidents([...incidents, ...response.data ]);//25-chama os dados que vem da api, ... serve para nao sobrescrever
    setTotal(response.headers['x-total-count']);//33- tras o total que vem atraves de un header, x-total-count eh o nome que foi dado
    setPage(page + 1);//38
    setLoading(false);//38
}

useEffect(() => { //18- eh uma funcao que vai ser disparada qd o array mudar 
   loadIncidents(); //20- dispara a funcao loadIncidents
},[]);
    return (
        <View style={styles.container}/* 4- adiciona o style dessa View geral*/ >     
            <View style={styles.header}/*5- add style para o header*/>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}/*6- add style para este texto em particular*/>
                                {total/*34 chamamos a variavel total*/} casos 
                             </Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem Vindo</Text>
            <Text style={styles.description}>Escolha um dos casos</Text>

            <FlatList //11- data = array de dados q vai montar a lista  
                        //12-renderItem= uma funcao responsavel por renderizar cada um desses itens
                        //13-pega os dados a serem renderizado e por dentro do rendeItem
                        //14-pega o estilo do incidentList e por no FlatList
                        //15-cria o keyExtractor q vai pegar o dado unico de cada item, dado q nao muda 
                        //16- showsVerticalScrollIndicator retira a barra lateral
                style={styles.incidentList}
                data= {incidents}//26- chama a funcao Incidents
                keyExtractor={incident => String(incident.id)} //27- poe como chave o id
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}//39-para parar o loading qd chegar no final 
                onEndReachedThreshold={0.2}//a qtos % do final da lista o usuario precisa estar para recarregar a proxima pagina
                renderItem={({item: incident})=>( //28- o render recebe um parametro chamado item, que eh o proprio incident, q mudamos o nome para incident para nao confundir
                                                //29- inserir os paremetro dinamicos {incident.name}, {incident.title}, {incident.value}
                                                //30- instala um pacote intl
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>  

                        <Text style={styles.incidentProperty}>CASO</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>  

                        <Text style={styles.incidentProperty}>Valor</Text>
                        <Text style={styles.incidentValue}>{//31- utiliza o intl format para mostrar o incident.value
                            Intl.NumberFormat('pt-BR', { 
                            style: 'currency', currency: 'BRL' 
                            })
                            .format(incident.value)}
                            </Text>  
                          
                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={() => navigateToDetail(incident)}/*8 onpress propiedade obrigatoria, navigateToDetail chama a funcao com essa arrow function*/>
                            <Text style={styles.detailsButtonText} >Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color='#e02041' /*9- aqui chamamos o icone. o nome arrow pega no site */ /> 
                        </TouchableOpacity>
                    </View>

                )}
            />
        </View>
    );
}
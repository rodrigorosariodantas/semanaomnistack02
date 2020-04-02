import React from 'react';//1- importar o React
import {View, Image, Text, TouchableOpacity, Linking} from 'react-native';//2-importar a View já q aqui nao tem div 
                                                                //5- importa  TouchableOpacity
                                                                //8- importa o Text e Image para usar
                                                                //18-importado o linking para envio de msg whatsapp
import styles from './styles';//4-importa os estilos
import  logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons'; //6-importa o Feather e a logo
import { useNavigation, useRoute } from '@react-navigation/native';//19- useRoute serve para pegar informacoes especificas  da pagina atual da app
import * as MailComposer from 'expo-mail-composer';//12- pega todas as exportacoes q o arquivo faz e joga na variavel MailComposer

export default function Detail(){//3- criar o nosso componente
    const navigation = useNavigation();//9- cria a variavel
    const route = useRoute();//20- cria a variavel route

    const incident = route.params.incident;//21- pra pegar o incidente cria a variavel incident com estes parametros 
    const message = `Olá ${incident.name}, estou entrando em contacto, pois, gostaria de ajudar no caso ${incident.title}o valor de 
        ${Intl.NumberFormat('pt-BR', { 
        style: 'currency', 
        currency: 'BRL'
        })//13- criada a variavel da msg para por dinamicamente no body e no whatsapp
        .format(incident.value)}.`;

    function navigateBack(){//10- faz a funcao, goback() eh uma funcao dentro do propio Navigation
        navigation.goBack()//este eh o icone de voltar
    }

    function sendMail(){//11- funcao do email com pacote do expo instalando $ expo  install expo-mail-composer
        MailComposer.composeAsync({//12- pega a variavel, chama o composeAsync e coloca as propriedade
            subject: `Heroe do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,//15- variavel mensagem puchada
        })
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);//17- no celular usa uma tecnologia chamada deeplink que eh os enderecos dos app no celular
    }                                                   //19-chama o linking com a URL

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack} >
                    <Feather name='arrow-left' size={28} color='#e02041' /* 7- importando o icone */ />
                </TouchableOpacity>
            </View>
        
        
        <View  /*22- add os dados dinamocos {incident.name}, {incident.title}...*/ 
        style={styles.incident}>
            <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf }</Text>

            <Text style={styles.incidentProperty}>Caso:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>Valor:</Text>
            <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL'
                    })
                    .format(incident.value)}
            </Text>
        </View>
        <View style={styles.contactBox}>
            <Text style={styles.heroTitle}>Salve o dia</Text>
            <Text style={styles.heroTitle}>Seja o heroe</Text>
            <Text style={styles.heroDescription}>Entre em contacto</Text>
        </View>

        <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={sendWhatsApp} /*aqui por a funcao no onpress */>
                <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={sendMail} /*16- o onPress sempre leva uma funcao dentro neste caso sendMail( ) */>
                <Text style={styles.actionText}>E-mail</Text>
            </TouchableOpacity>

        </View> 
    </View>
    );
}
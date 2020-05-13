import React, { useEffect } from 'react';

import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, FlatList, Text, Image, TouchableOpacity, Linking, ScrollView } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import styles from './styles';

import logoImg from '../../assets/logo.png';

export default function Detail(){

    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;

    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}.`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Herói o caso: ${incident.title}`,
            recipients: [incident.email],
            body: message
        })

    }

    function sendWhatsapp( ) {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }
    return (
        
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButtn} 
                    onPress={navigateBack}
                >
                <Feather name='arrow-left' size={24} color='#e02041' />
                </TouchableOpacity> 
                <Image source={logoImg}></Image>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.incident}>
                    <View style={styles.incidentHeader}>
                        <View style={styles.incidentHeaderItem}>
                            <Text style={styles.incidentProperty}>
                                ONG:
                            </Text>
                            <Text style={styles.incidentValue}>
                                {incident.name} de {incident.city} / {incident.uf}
                            </Text>
                        </View>
                        <View style={styles.incidentHeaderItem}>
                            <Text style={styles.incidentProperty}>
                                Caso:
                            </Text>
                            <Text style={styles.incidentValue}>
                            {incident.title}
                            </Text>
                        </View>

                    </View>
                    
                    <Text style={styles.incidentProperty}>
                        Descrição:
                    </Text>
                    <Text style={styles.incidentValue}>
                        {incident.description}
                    </Text>
                    <Text style={styles.incidentProperty}>
                        Valor:
                    </Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                    </Text>
                </View>
                <View style={styles.contact}>
                    <Text style={styles.heroCall}>Salve o dia!</Text>
                    <Text style={styles.heroCall}>Seja o herói desse caso</Text>
                    <Text style={styles.span}>Entre em contato</Text>
                    <View style={styles.actions}>
                        <TouchableOpacity 
                            style={styles.action} 
                            onPress={sendWhatsapp}
                        >
                        <Text style={styles.actionText}>Whatsapp</Text>
                        </TouchableOpacity> 
                        <TouchableOpacity 
                            style={styles.action} 
                            onPress={sendEmail}
                        >
                        <Text style={styles.actionText}>E-mail</Text>
                        </TouchableOpacity> 
                    </View>
                </View>
            </ScrollView>
        </View>
        
    );
}
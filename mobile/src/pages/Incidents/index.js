import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import styles from './styles';

import logoImg from '../../assets/logo.png';

export default function Incidents() {

    const [incidents, setIncidents] = useState([]);
    const [totalCases, setTotalCases] = useState(0);
    const [reachedTotal, setReachedTotal] = useState(false);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    

    const navigation = useNavigation();

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if(loading){
            return;
        }

        if(totalCases > 0 && incidents.length == totalCases){
            setReachedTotal(true);
            return;
        }

        setLoading(true);

        try {
            const response = await api.get('incidents', {
                params: { page }
            });
            
            
            setIncidents([...incidents, ...response.data.incidents]);
            setTotalCases(response.headers['x-total-count']);
            setLoading(false);
            setPage( page + 1 );

        } catch (err) {

        }

    }


    useEffect(() => {
        loadIncidents();
    }, []);

    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>

                <Text style={styles.headerText}>
                    Total de
                    {' '}
                    <Text style={styles.headerTextBold}>
                        {totalCases}
                        {' '}
                        casos
                    </Text>
                </Text>
            </View>

            {/* <Text style={styles.title}>
                Bem-vindo!
            </Text>
            <Text style={styles.description}>
                Escolha em dos casos abaixo e salve o dia
            </Text> */}

            <FlatList
                data={incidents}
                style={styles.incidentList}
                ListHeaderComponent={() => (
                    <View style={styles.listHeader}>
                        <Text style={styles.title}>
                            Bem-vindo!
                        </Text>
                        <Text style={styles.description}>
                            Escolha um dos casos abaixo e salve o dia
                        </Text>
                    </View>
                )}

                ListFooterComponent={reachedTotal && !loading && <Text style={styles.endOfList}>Nenhum outro caso novo...</Text> }
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents}
                onEndReachedThreshold={ 0.2 }
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>
                            ONG:
                        </Text>
                        <Text style={styles.incidentValue}>
                            {incident.name}
                        </Text>
                        <Text style={styles.incidentProperty}>
                            Caso:
                        </Text>
                        <Text style={styles.incidentValue}>
                            {incident.title}
                        </Text>
                        <Text style={styles.incidentProperty}>
                            Valor:
                        </Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                        </Text>

                        <TouchableOpacity
                            style={styles.detailButton}
                            onPress={() => navigateToDetail(incident)}
                        >
                            <Text style={styles.detailButtonText}>
                                Ver mais detalhes
                            </Text>

                            <Feather name='arrow-right' size={16} color='#e02041' />
                        </TouchableOpacity>
                    </View>
                )}
            />

            

        </View>
    );
}
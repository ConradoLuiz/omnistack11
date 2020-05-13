import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 18
    },

    incident: {
        padding: 24,
        paddingBottom: 4,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16
    },

    incidentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    incidentProperty: {
        fontSize: 14,
        color: '#41414b',
        fontWeight: 'bold',
        maxWidth: '50%'
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380',
        maxWidth: '65%'
    },

    contact: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16
    },

    heroCall: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 5
    },

    span: {
        marginTop: 10,
        color: '#737380',
        fontSize: 15
    },

    actions: {
        marginTop: 18,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    action: {
        backgroundColor: '#e02041',
        width: '48%',
        padding: 18,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },

    actionText: {
        fontSize: 16,
        color: '#fff'
    }



});
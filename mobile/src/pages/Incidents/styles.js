import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20
    },

    header:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 18
    },

    headerText: {
        fontSize: 15,
        color: '#737380'   
    },

    headerTextBold: {
        fontWeight: 'bold' 
    },

    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 12,
        color: '#13131a',
        fontWeight: 'bold'
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380'
    },

    // incidentList: {
    //     marginTop: 0
    // },

    listHeader: {
        marginBottom: 18
    },

    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16
    },

    incidentProperty: {
        fontSize: 14,
        color: '#41414b',
        fontWeight: 'bold'
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },

    detailButton:{
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    detailButtonText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight: 'bold'
    },

    endOfList:{
        paddingVertical: 10,
        fontSize: 16,
        alignSelf: 'center'
    }
});
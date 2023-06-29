import {StyleSheet} from 'react-native';

const darkStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#b077a3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    museum: {
        backgroundColor: '#3f573b',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: '#677286',
        fontSize: 18,
        fontWeight: 'bold',
    },
    favButton: {
        marginTop: 10,
        width: 100,
        height: 40,
        backgroundColor: '#702033',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    selectedMuseum: {
        backgroundColor: '#607353',
    },
    h1: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        marginTop: 10,
    },
    favoriteMuseum: {
        backgroundColor: 'yellow',
    },
    locationButton: {
        backgroundColor: '#0d4277',
        padding: 8,
        borderRadius: 8,
        alignSelf: 'flex-start',
        marginVertical: 8,
    },
    mapcontainer: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default darkStyles;

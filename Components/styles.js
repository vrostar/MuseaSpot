import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4F3549',
        alignItems: 'center',
        justifyContent: 'center',
    },
    museum: {
        backgroundColor: '#A1DE99',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 8,
    },
    buttonText: {
        color: '#20232a',
        fontSize: 18,
        fontWeight: 'bold',
    },
    favButton: {
        marginTop: 10,
        width: 100,
        height: 40,
        backgroundColor: '#F34973',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    selectedMuseum: {
        backgroundColor: '#C5F0AD',
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
        backgroundColor: '#1E90FF',
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

export default styles;

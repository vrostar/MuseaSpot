import {StyleSheet} from 'react-native';

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
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    museumImage: {
        width: 240,
        height: 240,
        marginRight: 10,
        borderRadius: 10,
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
    markerImage: {
        width: 64,
        height: 64,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    markerInfoContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 8,
        padding: 8,
    },
    markerInfoText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default styles;

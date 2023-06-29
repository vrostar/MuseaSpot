import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TouchableOpacity, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MuseumList = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [favorites, setFavorites] = useState([]);


    useEffect(() => {
        getMuseum();
        loadFavorites();
    }, []);

    const getMuseum = async () => {
        try {
            const response = await fetch('https://stud.hosted.hr.nl/1006324/musea.json');
            const json = await response.json();
            setData(json.museums);
            console.log(json)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const loadFavorites = async () => {
        try {
            const jsonData = await AsyncStorage.getItem('favorites');
            if (jsonData) {
                const parsedData = JSON.parse(jsonData);
                setFavorites(parsedData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const saveFavorites = async () => {
        try {
            const jsonData = JSON.stringify(favorites);
            await AsyncStorage.setItem('favorites', jsonData);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleFavorite = (museumId) => {
        const index = favorites.indexOf(museumId);
        if (index === -1) {
            setFavorites([...favorites, museumId]);
        } else {
            const updatedFavorites = favorites.filter((id) => id !== museumId);
            setFavorites(updatedFavorites);
        }
    };

    const renderMuseum = ({ item: museum }) => {
        const isSelected = museum.id === selectedId;
        const isFavorite = favorites.includes(museum.id);

        const handleLocationPress = (museumId) => {
            navigation.navigate('Map', { selectedMuseumId: museumId });
        };

        return (
            <TouchableOpacity
                style={[
                    styles.museum,
                    isSelected && styles.selectedMuseum,
                    isFavorite && styles.favoriteMuseum,
                ]}
                onPress={() => handleTitlePress(museum.id)}
            >
                <Text style={styles.h1}>{museum.title}</Text>

                <Image source={{uri: museum.img}} style={styles.museumImage} />

                {isSelected && <Text style={styles.description}>{museum.description}</Text>}

                <Pressable onPress={() => toggleFavorite(museum.id)} style={styles.favButton}>
                    <Text style={styles.buttonText}>{isFavorite ? 'Unfavorite' : 'Favorite'}</Text>
                </Pressable>

                <Pressable onPress={() => handleLocationPress(museum.id)} style={styles.locationButton}>
                    <Text style={styles.buttonText}>Location</Text>
                </Pressable>
            </TouchableOpacity>
        );
    };

    const handleTitlePress = (museumId) => {
        setSelectedId(selectedId === museumId ? null : museumId);
    };

    useEffect(() => {
        saveFavorites();
    }, [favorites]);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList data={data} keyExtractor={({ id }) => id} renderItem={renderMuseum} />
            )}
        </View>
    );
};

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
});

export default MuseumList;

import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, Text, View, TouchableOpacity, Pressable, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Settings from "./Settings"
import styles from "./styles";
import darkStyles from "./dark";

const MuseumList = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [favorites, setFavorites] = useState([]);
    const [isDarkMode, setDarkMode] = useState(false);



    useEffect(() => {
        getMuseum();
        loadFavorites();
    }, []);

    const getMuseum = async () => {
        try {
            const response = await fetch('https://stud.hosted.hr.nl/1006324/musea.json');
            const json = await response.json();
            setData(json.museums);
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

    const renderMuseum = ({item: museum}) => {
        const isSelected = museum.id === selectedId;
        const isFavorite = favorites.includes(museum.id);
        const containerStyle = isDarkMode ? darkStyles.museum : styles.museum;

        const handleLocationPress = (museumId) => {
            navigation.navigate('Map', {selectedMuseumId: museumId});
        };

        return (
            <TouchableOpacity
                style={[
                    containerStyle,
                    isSelected && styles.selectedMuseum,
                    isFavorite && styles.favoriteMuseum,
                ]}
                onPress={() => handleTitlePress(museum.id)}
            >
                <Text style={styles.h1}>{museum.title}</Text>

                <Image source={{uri: museum.img}} style={styles.museumImage}/>

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
                <ActivityIndicator/>
            ) : (
                <FlatList data={data} keyExtractor={({id}) => id} renderItem={renderMuseum}/>
            )}
        </View>
    );
};

export default MuseumList;

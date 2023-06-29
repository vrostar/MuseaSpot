import React, { useEffect, useState } from 'react';
import { ActivityIndicator, TouchableOpacity, Pressable, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MuseumList from './Components/MuseumList';
import Map from './Components/Map';
import styles from './Components/styles';

const Tab = createBottomTabNavigator();

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const saveDataToStorage = async (data) => {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('museumData', jsonData);
    } catch (error) {
      console.error(error);
    }
  };

  const getDataFromStorage = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('museumData');
      if (jsonData) {
        const parsedData = JSON.parse(jsonData);
        setData(parsedData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getMuseum = async () => {
    try {
      const response = await fetch('https://stud.hosted.hr.nl/1006324/musea.json');
      const json = await response.json();
      setData(json.museums);
      saveDataToStorage(json.museums);
    } catch (error) {
      console.error(error);
      getDataFromStorage();
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
    const isFavorite = favorites.includes(museum.id);

    const handleLocationPress = (museumId) => {
      navigation.navigate('Map', { selectedMuseumId: museumId });
    };

    return (
        <TouchableOpacity
            style={[
              styles.museum,
              isFavorite && styles.favoriteMuseum,
            ]}
            onPress={() => handleTitlePress(museum.id)}
        >
          <Text style={styles.h1}>{museum.title}</Text>

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

  useEffect(() => {
    getMuseum();
    loadFavorites();
    saveFavorites();
  }, [favorites]);

  if (isLoading) {
    return (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
    );
  }

  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="MuseumList" component={MuseumList} initialParams={{ data, renderMuseum }} />
          <Tab.Screen name="Map">
            {(props) => <Map {...props} data={data} />}
          </Tab.Screen>

        </Tab.Navigator>
      </NavigationContainer>
  );
};

export default App;

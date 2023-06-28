import React, { useEffect, useState, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, TouchableOpacity, Pressable, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MuseumListScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);


  const getMuseum = async () => {
    try {
      const response = await fetch('https://stud.hosted.hr.nl/1006324/museums.json');
      const json = await response.json();
      setData(json.museums);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const saveButton = () => {};

  useEffect(() => {
    getMuseum();
  }, []);

  const renderMuseum = ({ item: museum }) => {
    const isSelected = museum.id === selectedId;

    return (
        <TouchableOpacity
            style={[styles.museum, isSelected && styles.selectedMuseum]}
            onPress={() => handleTitlePress(museum.id)}
        >
          <Text style={styles.h1}>{museum.title}</Text>

          {isSelected && <Text style={styles.description}>{museum.description}</Text>}

          <Pressable onPress={saveButton} style={styles.saveButton}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </TouchableOpacity>
    );
  };

  const handleTitlePress = (museumId) => {
    setSelectedId(selectedId === museumId ? null : museumId);
  };

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

const MapScreen = ({ data }) => {
  const initialRegion = {
    latitude: 51.9225,
    longitude: 4.47917,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    // Adjust map region based on selected marker
    if (marker) {
      const region = {
        latitude: marker.latitude,
        longitude: marker.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      mapRef.animateToRegion(region);
    }
  };

  let mapRef = null;

  return (
      <View style={styles.mapcontainer}>
        <MapView
            style={styles.map}
            initialRegion={initialRegion}
            showsUserLocation={true}
            ref={(ref) => (mapRef = ref)}
        >
          {data.map((museum) => (
              <Marker
                  key={museum.id}
                  coordinate={{ latitude: museum.latitude, longitude: museum.longitude }}
                  title={museum.title}
                  onPress={() => handleMarkerPress(museum)}
                  // description={museum.description}
              >
                <Image source={require('./assets/sheesh.png')} style={{ height: 35, width: 35 }} />
              </Marker>
          ))}
        </MapView>
      </View>
  );
};

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

  const getFavoritesFromStorage = async () => {
    try {
      const favoritesData = await AsyncStorage.getItem('favorites');
      if (favoritesData) {
        const parsedFavorites = JSON.parse(favoritesData);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getMuseum = async () => {
    try {
      const response = await fetch('https://stud.hosted.hr.nl/1006324/museums.json');
      const json = await response.json();
      setData(json.museums);
      saveDataToStorage(json.museums); // Save data to local storage
    } catch (error) {
      console.error(error);
      getDataFromStorage(); // Retrieve data from local storage if fetch fails
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataFromStorage(); // Retrieve data from local storage on app startup
    getMuseum();
    getFavoritesFromStorage(); // Retrieve favorites from local storage
  }, []);

  return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="List">
            {(props) => <MuseumListScreen {...props} isLoading={isLoading} data={data} />}
          </Tab.Screen>
          <Tab.Screen name="Map">
            {(props) => <MapScreen {...props} data={data} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
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
  buttonText: {
    color: '#20232a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
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
  mapcontainer: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default App;

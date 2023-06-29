import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = ({ route, data }) => {
    const { selectedMuseumId } = route.params || {};

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
                        pinColor={museum.id === selectedMuseumId ? 'red' : undefined}
                    >
                    </Marker>
                ))}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    mapcontainer: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

export default Map;

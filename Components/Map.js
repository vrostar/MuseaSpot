import React, { useState, useRef } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = ({ data }) => {

    const initialRegion = {
        latitude: 51.9225,
        longitude: 4.47917,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    const [selectedMarker, setSelectedMarker] = useState(null);
    const mapRef = useRef(null);

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

            mapRef.current.animateToRegion(region);
        }
    };

    const renderMarker = (marker) => (
        <Marker
            key={marker.id}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            onPress={() => handleMarkerPress(marker)}
            pinColor={marker.id === selectedMarker?.id ? 'red' : undefined}
        >
            <Image source={{ uri: marker.img }} style={styles.markerImage} />
        </Marker>
    );

    return (
        <View style={styles.mapcontainer}>
            <MapView
                style={styles.map}
                initialRegion={initialRegion}
                showsUserLocation={true}
                ref={mapRef}
            >
                {data.map(renderMarker)}
            </MapView>
            {selectedMarker && (
                <View style={styles.markerInfoContainer}>
                    <Text style={styles.markerInfoText}>{selectedMarker.title}</Text>
                    <Text style={styles.markerInfoText}>{selectedMarker.description}</Text>
                </View>
            )}
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

export default Map;

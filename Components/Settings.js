import React, { useState } from 'react';
import { View, Switch, StyleSheet, Text } from 'react-native';
import MuseumList from "./MuseumList";

const Settings = () => {
    const [isDarkMode, setDarkMode] = useState(false);

    const handleDarkModeToggle = () => {
        setDarkMode((prevState) => !prevState);
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>Dark Mode</Text>
            <Switch value={isDarkMode} onValueChange={handleDarkModeToggle} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
});

export default Settings;

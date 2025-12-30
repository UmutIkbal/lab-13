import { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';

export default function LocationScreen() {
    const [coords, setCoords] = useState(null);
    const [loading, setLoading] = useState(false);

    const getLocation = async () => {
        setLoading(true);
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Konum izni gerekli');
                return;
            }
            const position = await Location.getCurrentPositionAsync({});
            setCoords(position.coords);
        } catch (error) {
            Alert.alert('Konum alınamadı');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Konumu Al" onPress={getLocation} />
            {loading && <Text style={styles.info}>Yükleniyor...</Text>}
            {coords && (
                <View style={styles.card}>
                    <Text style={styles.info}>Enlem: {coords.latitude}</Text>
                    <Text style={styles.info}>Boylam: {coords.longitude}</Text>
                    <Text style={styles.info}>Doğruluk: {coords.accuracy}m</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
        padding: 20,
    },
    card: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
    },
    info: {
        fontSize: 16,
    },
});

import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function ColorManagementLoadingScreen() {
    return (
        <LinearGradient
            colors={['#E0C3FC', '#CBB4F4', '#FFFFFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
                <View style={{ alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <View style={{ backgroundColor: 'rgba(255,255,255,0.9)', padding: 4, borderRadius: 24 }}>
                    <Image
                        source={require('../assets/ventlyIcon.png')}
                        style={{ width: 100, height: 100 }}
                        resizeMode="contain"
                    />
                </View>
                <Text style={{ color: 'white', fontSize: 24, fontWeight: '700', letterSpacing: 2, textTransform: 'uppercase', opacity: 0.8 }}>
                    Vently.AI
                </Text>
            </View>
        </LinearGradient>
    );
}

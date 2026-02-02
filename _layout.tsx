import '../global.css';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { ColorManagementLoadingScreen } from '../components';

// Prevent Auto hide splash screen
SplashScreen.preventAutoHideAsync();

export default function Layout() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                // Replace with data loading later najaaa
                await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
        // Hide splash screen
        await SplashScreen.hideAsync();
    }, []);

    if (!appIsReady) {
        return (
            <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
                <ColorManagementLoadingScreen />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <Stack>
                <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
            </Stack>
        </View>
    );
}

import React, { useEffect, useState, useCallback } from 'react';
import '../global.css';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ColorManagementLoadingScreen } from '../components';
import { api } from '../services/api';
import { AppProvider, useApp } from '../contexts/AppContext';

SplashScreen.preventAutoHideAsync();

export function Layout() {
    const [appIsReady, setAppIsReady] = useState(false);
    const { setSessionId, setMessages } = useApp();

    useEffect(() => {
        async function prepare() {
            try {
                const response = await api.get<{ sessions: any[] }>('/sessions?mode=1');

                if (response && response.sessions && response.sessions.length > 0) {
                    const activeSessionId = response.sessions[0].session_id;
                    
                    const history = await api.get<{ messages: any[] }>(`/sessions/${activeSessionId}/messages`);
                    
                    setSessionId(activeSessionId);
                    setMessages(Array.isArray(history.messages) ? history.messages : []);
                } else {
                    const newSession = await api.post<{ session_id: string, question: string }>('/sessions', {});
                    
                    setSessionId(newSession.session_id);
                    setMessages([{
                        role: 'assistant',
                        content: newSession.question || 'Hello! How are you feeling today?',
                        timestamp: new Date().toISOString()
                    }]);
                }
            } catch (e) {
                console.error("Initialization error:", e);

                setSessionId("fallback-001");
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    const onLayoutRootView = useCallback(async () => {
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
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
            <Stack screenOptions={{ headerShown: false }} initialRouteName="login">
                <Stack.Screen name="index" />
                <Stack.Screen name="history" />
                <Stack.Screen name="diary" />
            </Stack>
        </View>
    );
}

export default function LayoutWrapper() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <Layout />
      </AppProvider>
    </SafeAreaProvider>
  );
}
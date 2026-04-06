import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useApp } from '../contexts/AppContext';
import { api } from '../services/api';

export interface HistoryItem {
  id: string;
  title: string;
  date: string;
  snippet: string;
}

interface SessionResponse {
  session_id: string;
  status: string;
  start_timestamp: string;
}

export default function HistoryPage() {
  const router = useRouter();
  const { sessionId, setSessionId, setMessages } = useApp();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get<{ sessions?: SessionResponse[] }>('/sessions?mode=0');
        if (response && response.sessions && response.sessions.length > 0) {
          const mapped = response.sessions.map((session) => {
            const dateObj = new Date(session.start_timestamp);
            const dateStr = isNaN(dateObj.getTime())
              ? 'Unknown Date'
              : dateObj.toISOString().split('T')[0];

            return {
              id: session.session_id,
              title: 'Chat with AI',
              date: dateStr,
              snippet: `Status: ${session.status || 'unknown'}`,
            };
          });
          setHistory(mapped);
        } else {
          setHistory([]);
        }
      } catch (error) {
        console.error('Failed to fetch history:', error);
        setHistory([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (isLoading) {
    return (
      <LinearGradient colors={['#E0C3FC', '#CBB4F4', '#FFFFFF']} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#5B49E9" />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#E0C3FC', '#CBB4F4', '#FFFFFF']} style={{ flex: 1 }}>
      <View style={{ paddingTop: 56, paddingHorizontal: 24, paddingBottom: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: '700' }}>History</Text>
        </View>
        <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>Previous conversations</Text>
      </View>

      {history.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#5B49E9', fontSize: 18, fontWeight: '600' }}>No past sessions found.</Text>
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={async () => {
                if (item.id === sessionId) {
                  router.navigate('/');
                  return;
                }
                setIsLoading(true);
                try {
                  const historyData = await api.get<{ messages: any[] }>(`/sessions/${item.id}/messages`);
                  setSessionId(item.id);
                  setMessages(Array.isArray(historyData.messages) ? historyData.messages : []);
                  router.navigate('/');
                } catch (error) {
                  console.error('Failed to load past session messages:', error);
                } finally {
                  setIsLoading(false);
                }
              }}
              style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                marginBottom: 16,
                padding: 20,
                borderRadius: 24,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                shadowColor: '#5B49E9',
                shadowOpacity: 0.08,
                shadowRadius: 8,
              }}
            >
              <View>
                <Text style={{ color: '#5B49E9', fontWeight: '700', fontSize: 16 }}>{item.title}</Text>
                <Text style={{ color: '#6B7280', fontSize: 12, marginTop: 4 }} numberOfLines={1}>{item.snippet}</Text>
                <Text style={{ color: '#9CA3AF', fontSize: 12, marginTop: 4 }}>{item.date}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#9C89FF" />
            </TouchableOpacity>
          )}
        />
      )}
    </LinearGradient>
  );
}

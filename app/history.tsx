import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';


export default function HistoryPage() {
  const router = useRouter();
  const history = [
    { id: '1', title: 'Chat with AI', date: '2026-02-10', snippet: "Lay in bed" },
    { id: '2', title: 'Chat with AI', date: '2026-02-09', snippet: "Feeling shitty on bed" },
    { id: '3', title: 'Chat with AI', date: '2026-02-08', snippet: "Never gonna give you up" },
    { id: '4', title: 'Chat with AI', date: '2026-02-05', snippet: "Blow up smallest violin" },
    { id: '5', title: 'Chat with AI', date: '2026-02-04', snippet: "Don't you need me?" },
  ];

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

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push({ pathname: '/', params: { date: item.date } })}
            style={{ backgroundColor: 'rgba(255,255,255,0.9)', marginBottom: 16, padding: 20, borderRadius: 24, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', shadowColor: '#5B49E9', shadowOpacity: 0.08, shadowRadius: 8 }}
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
    </LinearGradient>
  );
}

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Modal, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuBar } from '../components/MenuBar';
import { useApp } from '../contexts/AppContext';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  createdAt: string;
}



export default function ChatPage() {
  const { sessionId, setSessionId, messages, setMessages } = useApp();
  const { accessToken } = useAuth();
  const [inputText, setInputText] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = React.useRef<FlatList<Message>>(null);

  useEffect(() => {
    if (messages.length) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages]);

  const formatTime = (dateStr?: string) => {
    const date = dateStr ? new Date(dateStr) : new Date();
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const mapToFrontend = (msg: any, index: number): Message => ({
    id: msg.id || index.toString(), 
    text: msg.content,
    sender: msg.role === 'user' ? 'user' : 'ai',
    createdAt: formatTime(msg.timestamp),
  });

  const sendMessage = async () => {
    if (!inputText.trim() || !sessionId || isLoading) return;

    const userContent = inputText.trim();
    const userMessage = { role: 'user', content: userContent, timestamp: new Date().toISOString() };

    setInputText('');
    Keyboard.dismiss();
    setMessages((prev: Partial<Message>[]) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // POST to /sessions/{session_id}/messages 
      const data = await api.post<{ response: string; diary: string | null }>(
        `/sessions/${sessionId}/messages`,
        { message: userContent },
        accessToken
      );

      const aiMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev: Partial<Message>[]) => [...prev, aiMessage]);

      if (data.diary) {
        console.log("New diary entry recorded ");
      }
    } catch (error) {
      console.error('Chat Error:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I had trouble connecting. Please try again.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev: Partial<Message>[]) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <LinearGradient colors={['#E0C3FC', '#CBB4F4', '#FFFFFF']} style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          behavior="padding"
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 20}
        >
          <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableOpacity onPress={() => setMenuOpen(true)}>
              <Image source={require('../assets/ventlyIcon.png')} style={{ width: 32, height: 32 }} />
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={messages.map(mapToFrontend)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className={`flex-row ${item.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4 px-4`}>
                <View className={`max-w-[80%] p-4 rounded-2xl ${item.sender === 'user' ? 'bg-[#5B49E9]' : 'bg-[#9C89FF]'}`}>
                  <Text className="text-white text-base">{item.text}</Text>
                  <Text className="text-white/50 text-[10px] mt-1 text-right">{item.createdAt}</Text>
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 10 }}
            ListFooterComponent={
              isLoading ? (
                <View className="flex-row justify-start mb-4 px-4">
                  <View className="max-w-[80%] p-4 rounded-2xl bg-[#9C89FF] flex-row items-center">
                    <ActivityIndicator size="small" color="white" />
                    <Text className="text-white text-base ml-2">Vently is thinking...</Text>
                  </View>
                </View>
              ) : null
            }
          />

          <View className="p-4 bg-white/80 border-t border-purple-100 flex-row items-center">
            <TextInput
              className="flex-1 h-12 px-4 bg-white rounded-full border border-purple-200"
              placeholder="How are you feeling?"
              value={inputText}
              onChangeText={setInputText}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity 
              onPress={sendMessage} 
              disabled={isLoading || !inputText.trim()} 
              className={`ml-2 p-3 rounded-full ${isLoading ? 'bg-gray-300' : 'bg-[#5B49E9]'}`}
            >
              <Ionicons name="send" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
      </SafeAreaView>
      <Modal
        visible={menuOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setMenuOpen(false)}
      >
        <TouchableOpacity
          style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
          activeOpacity={1}
          onPressOut={() => setMenuOpen(false)}
        >
          <TouchableWithoutFeedback>
            <View style={{ width: '70%', height: '100%' }}>
              <MenuBar onClose={() => setMenuOpen(false)} />
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
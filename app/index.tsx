import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { MenuBar } from '../components/MenuBar';
import { useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';

export default function ChatPage() {
  // Delete this later. This is just mock up chat messages na bro
  const [messages, setMessages] = useState([
    { id: '1', 
      text: "Hey, How are you today?", 
      sender: 'ai', 
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { id: '2', 
      text: "Today I don't feel like doing anything.", 
      sender: 'user', 
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { id: '3', 
      text: "I understand what you're going through. It's okay to take a break and rest.", 
      sender: 'ai', 
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    { id: '4', 
      text: "Thanks, I just wanna lay in my bed.", 
      sender: 'user',
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
  ]);

  // Menu state
  const [menuOpen, setMenuOpen] = useState(false);
  const params = useLocalSearchParams();

  // Mock up History conversations.
  const CONVERSATIONS: Record<string, any[]> = {
    '2026-02-10': [
      { id: '1', text: "Hey, How are you today?.", sender: 'ai', createdAt: '2:00 PM' },
      { id: '2', text: "Today I don't feel like doing anything.", sender: 'user', createdAt: '2:01 PM' },
      { id: '3', text: "I understand what you're going through. It's okay to take a break and rest.", sender: 'ai', createdAt: '2:03 PM' },
      { id: '4', text: "Thanks, I just wanna lay in my bed.", sender: 'user', createdAt: '2:05 PM' },
    ],
    '2026-02-09': [
      { id: '1', text: "Hey, how are you doing today?, did you feel good in your bed yesterday?", sender: 'ai', createdAt: '3:10 PM' },
      { id: '2', text: "feeling shitty in my bed, didn't take my f**king meds", sender: 'user', createdAt: '3:12 PM' },
      { id: '3', text: "I'm sorry to hear that. Remember, it's important to take your meds as prescribed. Is there anything specific that's making you feel this way?", sender: 'ai', createdAt: '3:15 PM' },
      { id: '4', text: "hyperpop up in my ears, everything just dissapears, don't wanna be someone else, just don't wanna hate myself, instead I'm wanna feel good.", sender: 'user', createdAt: '3:20 PM' },
    ],
    '2026-02-08': [
      { id: '1', text: "Hey, yesterday was a rough day for you, wasn't it? Forget about it, how are you feeling today?", sender: 'ai', createdAt: '4:05 PM' },
      { id: '2', text: "Never gonna give you up, Never gonna let you down, Never gonna run around and desert you. Never gonna make you cry, Never gonna say goodbye, Never gonna tell a lie and hurt you.", sender: 'user', createdAt: '4:07 PM' },
      { id: '3', text: "I see you're quoting a song. Music can be a great way to express how you're feeling. Do you want to talk about what's on your mind?", sender: 'ai', createdAt: '4:10 PM' },
      { id: '4', text: "I just wanna feel good, you know?", sender: 'user', createdAt: '4:12 PM' },
    ],
    '2026-02-05': [
      { id: '1', text: "Hey, how are you doing today?", sender: 'ai', createdAt: '5:00 PM' },
      { id: '2', text: "I'll blow up into smithereens and spew my tiny symphony all up and down a city street while tryna put my mind at ease like finishing this melody this feels like a necessity so this could be the death of me or maybe just a better me now, come in with the timpanis and take a shot of Hennessy I know I'm not there mentally but you could be the remedy so let me play my violin for you", sender: 'user', createdAt: '5:05 PM' },
      { id: '3', text: "It sounds like you're going through a lot right now. Remember that it's okay to feel overwhelmed, and it's important to take care of yourself", sender: 'ai', createdAt: '5:10 PM' },
      { id: '4', text: "Thanks, I'm about to blow! Let's go!", sender: 'user', createdAt: '5:15 PM' },
    ],
    '2026-02-04': [
      { id: '1', text: "Hey, how are you doing today?", sender: 'ai', createdAt: '6:00 PM' },
      { id: '2', text: "Don't you want me like I want you, baby don't you need me like I need you now sleep tomorrow but tonight go crazy all you gotta do is just meet me at the", sender: 'user', createdAt: '6:05 PM' },
      { id: '3', text: "It seems like you're expressing some strong emotions. Remember that it's important to take care of yourself and reach out for support if you need it.", sender: 'ai', createdAt: '6:10 PM' },
      { id: '4', text: "I know, I just wanna go crazy tonight, but I also wanna feel good tomorrow.", sender: 'user', createdAt: '6:15 PM' },
    ],
  };

  useEffect(() => {
    const paramDate = params.date as string | undefined;
    if (paramDate && CONVERSATIONS[paramDate]) {
      setMessages(CONVERSATIONS[paramDate].map((m, i) => ({ ...m, id: String(i + 1) })));
    }
  }, [params.date]);

  const renderMessage = ({ item }: { item: any }) => (
    <View className={`flex-row ${item.sender === 'user' ? 'justify-end' : 'justify-start'} mb-5 px-4`}>
      {item.sender === 'ai' && (
          <View className="bg-white rounded-full p-1 mr-2 self-end shadow-sm">
          <Image source={require('../assets/ventlyIcon.png')} className="w-4 h-4" />
        </View>
      )}
      <View
        className={`max-w-[75%] p-4 rounded-3xl ${item.sender === 'user' ? 'bg-[#5B49E9] rounded-tr-none' : 'bg-[#9C89FF] rounded-tl-none'
          } shadow-sm`}
      >
        <Text className="text-white text-[16px] leading-6 font-medium">{item.text}</Text>
        <Text className="text-white/60 text-[10px] mt-1 text-right">{item.createdAt}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingBottom: 24 }}>
      <LinearGradient
        colors={['#E0C3FC', '#CBB4F4', '#FFFFFF']}
        style={{ flex: 1 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
        >
          <View style={{ flex: 1 }}>
            <View style={{ paddingTop: 56, paddingBottom: 16, paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)' }}>
              <TouchableOpacity 
                style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: 12, borderRadius: 16 }}
                onPress={() => setMenuOpen(!menuOpen)}
              >
                {/* Incase we want burger menu */}
                {/* <Ionicons name="menu" size={24} color="white" /> */}
                <Image source={require('../assets/ventlyIcon.png')} className="w-6 h-6" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={renderMessage}
              contentContainerStyle={{ paddingVertical: 20, flexGrow: 1 }}
              style={{ flex: 1 }}
              scrollEnabled={true}
              showsVerticalScrollIndicator={false}
            />
          </View>
          <View style={{ paddingHorizontal: 16, paddingBottom: 24, paddingTop: 8, backgroundColor: 'transparent' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 999, paddingHorizontal: 20, paddingVertical: 8, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.5)' }}>
              <TextInput
                placeholder="What are you thinking?"
                style={{ flex: 1, height: 48, color: '#222', fontWeight: '500' }}
                placeholderTextColor="#B0B0B0"
              />
              <TouchableOpacity style={{ backgroundColor: '#5B49E9', width: 40, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 20, marginLeft: 8 }}>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>

      {/* Menu Overlay */}
      {menuOpen && (
        <View className="absolute inset-0 bg-black/30">
          <View className="flex-1 flex-row ml-auto">
            <MenuBar onClose={() => setMenuOpen(false)} />
          </View>
        </View>
      )}
    </View>
  );

}

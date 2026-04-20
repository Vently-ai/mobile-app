import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

interface MenuBarProps {
  onClose: () => void;
}

export function MenuBar({ onClose }: MenuBarProps) {
  const router = useRouter();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    onClose();
    await logout();
    router.replace('/login');
  };

  return (
    <LinearGradient
      colors={['#E0C3FC', '#CBB4F4', '#9C89FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1 w-80 pt-8 px-6"
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center mb-6">
          <TouchableOpacity onPress={() => { onClose(); }}>
            <View className="bg-white rounded-2xl p-2 mb-3">
              <Image source={require('../assets/ventlyIcon.png')} style={{ width: 40, height: 40 }} />
            </View>
          </TouchableOpacity>
          {user && (
            <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14, fontWeight: '600' }}>
              Hi, {user.nickname || user.username} 👋
            </Text>
          )}
        </View>

        {/* Menu Items */}
        <TouchableOpacity className="mb-6" onPress={() => { onClose(); router.push('/diary'); }}>
          <Text className="text-white font-bold text-lg">My Diary</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mb-6" onPress={() => { onClose(); router.push('/history'); }}>
          <Text className="text-white font-bold text-lg">History</Text>
        </TouchableOpacity>
      </ScrollView>

      <View>
        <TouchableOpacity onPress={handleLogout} className="mb-4 py-3">
          <Text style={{ color: '#FFD6D6', fontWeight: '700', fontSize: 16 }}>Log Out</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose} className="mb-6 py-3">
          <Text className="text-white font-bold text-lg">Back</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

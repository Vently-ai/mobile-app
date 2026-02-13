import React, { } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

interface MenuBarProps {
  onClose: () => void;
}

export function MenuBar({ onClose }: MenuBarProps) {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#E0C3FC', '#CBB4F4', '#9C89FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      className="flex-1 w-80 pt-8 px-6"
    >
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="items-center mb-8">
          <TouchableOpacity onPress={() => { onClose(); }}>
            <View className="bg-white rounded-2xl p-2 mb-4">
              <Image source={require('../assets/ventlyIcon.png')} style={{ width: 40, height: 40 }} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <TouchableOpacity className="mb-6" onPress={() => { onClose(); router.push('/diary'); }}>
          <Text className="text-white font-bold text-lg">My Diary</Text>
        </TouchableOpacity>

        <TouchableOpacity className="mb-6" onPress={() => { onClose(); router.push('/history'); }}>
          <Text className="text-white font-bold text-lg">History</Text>
        </TouchableOpacity>


      </ScrollView>

      <TouchableOpacity
        onPress={onClose}
        className="mb-6 py-3"
      >
        <Text className="text-white font-bold text-lg">Back</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

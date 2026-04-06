import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    
    return (
        <LinearGradient
            colors={['#E0C3FC', '#CBB4F4', '#FFFFFF']}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}
        >
            {/* Vently Logo */}
            <Image
                source={require('../assets/ventlyIcon.png')}
                style={{ width: 100, height: 100, marginTop: 80 }}
                resizeMode="contain"
            />

            {/* Title */}
            <Text className="text-2xl font-bold text-center mt-10 text-[#5B49E9]">
                Log in your account
            </Text>

            {/* Email Input */}
            <View className="w-full px-8 mt-10">
                <Text className="text-base font-semibold mb-2 text-[#5B49E9]">Email</Text>
                <TextInput
                    className="w-full h-12 px-4 bg-white rounded-full border border-purple-200"
                    placeholder="ex: jon.smith@email.com"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                />
                </View>

            {/* Password Input */}
            <View className="w-full px-8 mt-6">
                <TextInput
                    className="w-full h-12 px-4 bg-white rounded-full border border-purple-200"
                    placeholder="password"
                    placeholderTextColor="#9CA3AF"
                    keyboardType= "default"
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            {/* NEXT Button */}
            <TouchableOpacity
                className="w-48 h-12 mt-8 rounded-full items-center justify-center"
                onPress={() => router.navigate('/')} // Navigate to the chat page (index)
                style={{ backgroundColor: '#B4A2FF' }}
            >
                <Text className="text-white font-bold text-lg">NEXT</Text>
            </TouchableOpacity>
            {/* Sign Up Link */}
            <View className="absolute bottom-20 flex-row">
                <Text className="text-base text-gray-500">
                    Don't have an account?
                </Text>
                <Link href="/signup" className="text-base font-semibold text-[#5B49E9] ml-1">
                    SIGN UP
                </Link>
            </View>

        </LinearGradient>
    );
}
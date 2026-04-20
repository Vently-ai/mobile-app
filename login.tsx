import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            setError('Please enter username and password.');
            return;
        }
        setError('');
        setIsLoading(true);
        try {
            await login(username.trim(), password);
            router.replace('/');
        } catch (err: any) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

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

            {/* Error message */}
            {error ? (
                <View className="w-full px-8 mt-4">
                    <Text className="text-red-500 text-sm text-center">{error}</Text>
                </View>
            ) : null}

            {/* Username Input */}
            <View className="w-full px-8 mt-6">
                <Text className="text-base font-semibold mb-2 text-[#5B49E9]">Username</Text>
                <TextInput
                    className="w-full h-12 px-4 bg-white rounded-full border border-purple-200"
                    placeholder="ex: jon.smith"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="none"
                    value={username}
                    onChangeText={setUsername}
                />
            </View>

            {/* Password Input */}
            <View className="w-full px-8 mt-6">
                <Text className="text-base font-semibold mb-2 text-[#5B49E9]">Password</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 9999, borderWidth: 1, borderColor: '#A78BFA' }}>
                    <TextInput
                        className="flex-1 h-12 px-4"
                        placeholder="password"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                        style={{ backgroundColor: 'transparent' }}
                    />
                    <TouchableOpacity onPress={() => setShowPassword((v) => !v)} style={{ paddingHorizontal: 12 }}>
                        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#A78BFA" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* NEXT Button */}
            <TouchableOpacity
                className="w-48 h-12 mt-8 rounded-full items-center justify-center"
                onPress={handleLogin}
                disabled={isLoading}
                style={{ backgroundColor: isLoading ? '#C4B5FD' : '#B4A2FF' }}
            >
                {isLoading
                    ? <ActivityIndicator color="white" />
                    : <Text className="text-white font-bold text-lg">NEXT</Text>
                }
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

import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, Link } from 'expo-router';
import { useAuth } from '../contexts/AuthContext'

export default function SignUpPage() {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signup } = useAuth();

  const handleSignUp = async () => {
    setError('');

    if (!username.trim() || !nickname.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!termsAccepted) {
      setError('Please accept the terms & policy.');
      return;
    }

    setIsLoading(true);
    try {
      await signup(username.trim(), nickname.trim(), password);
      router.replace('/');
    } catch (err: any) {
      setError(err.message || 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#E0C3FC', '#CBB4F4', '#FFFFFF']} className="flex-1">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="w-full flex-row items-center px-6 pt-14 pb-4">
            <TouchableOpacity onPress={() => router.back()} className="p-2">
              <Ionicons name="arrow-back" size={24} color="#5B49E9" />
            </TouchableOpacity>
            <View className="flex-1 items-center">
              <Image
                source={require('../assets/ventlyIcon.png')}
                className="w-12 h-12"
                resizeMode="contain"
              />
            </View>
            <View className="w-10 h-10" />
          </View>

          {/* Title */}
          <Text className="text-3xl font-bold text-center mt-8 mb-4 text-[#5B49E9]">
            Create your account
          </Text>

          {/* Error message */}
          {error ? (
            <View className="w-full px-8 mb-2">
              <Text className="text-red-500 text-sm text-center">{error}</Text>
            </View>
          ) : null}

          {/* Form Fields */}
          <View className="w-full px-8">
            <Text className="text-base font-semibold mb-2 text-[#5B49E9]">Username</Text>
            <TextInput
              className="w-full h-12 px-4 bg-white/60 rounded-2xl mb-4 border border-purple-200"
              placeholder="ex: jon.smith"
              placeholderTextColor="#9CA3AF"
              autoCapitalize="none"
              value={username}
              onChangeText={setUsername}
            />

            <Text className="text-base font-semibold mb-2 text-[#5B49E9]">Nickname</Text>
            <TextInput
              className="w-full h-12 px-4 bg-white/60 rounded-2xl mb-4 border border-purple-200"
              placeholder="Your display name"
              placeholderTextColor="#9CA3AF"
              value={nickname}
              onChangeText={setNickname}
            />

            <Text className="text-base font-semibold mb-2 text-[#5B49E9]">Password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 16, borderWidth: 1, borderColor: '#A78BFA', marginBottom: 16 }}>
              <TextInput
                className="flex-1 h-12 px-4"
                placeholder="********"
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

            <Text className="text-base font-semibold mb-2 text-[#5B49E9]">Confirm password</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: 16, borderWidth: 1, borderColor: '#A78BFA', marginBottom: 24 }}>
              <TextInput
                className="flex-1 h-12 px-4"
                placeholder="********"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                style={{ backgroundColor: 'transparent' }}
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword((v) => !v)} style={{ paddingHorizontal: 12 }}>
                <Ionicons name={showConfirmPassword ? 'eye-off' : 'eye'} size={22} color="#A78BFA" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Checkbox */}
          <TouchableOpacity
            className="flex-row items-center self-start ml-8 mb-8"
            onPress={() => setTermsAccepted(!termsAccepted)}
          >
            <Ionicons
              name={termsAccepted ? 'checkbox-outline' : 'square-outline'}
              size={24}
              color="#5B49E9"
            />
            <Text className="ml-2 text-base text-gray-700">
              I understood the{' '}
              <Text className="text-cyan-500 font-semibold">terms & policy</Text>
            </Text>
          </TouchableOpacity>

          {/* SIGN UP Button */}
          <TouchableOpacity
            className="w-64 h-14 mt-4 rounded-2xl items-center justify-center"
            style={{ backgroundColor: isLoading ? '#C4B5FD' : '#B4A2FF' }}
            onPress={handleSignUp}
            disabled={isLoading}
          >
            {isLoading
              ? <ActivityIndicator color="white" />
              : <Text className="text-white font-bold text-xl">SIGN UP</Text>
            }
          </TouchableOpacity>

          {/* Footer */}
          <View className="flex-row mt-8 mb-10">
            <Text className="text-base text-gray-500">Have an account? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <Text className="text-base font-semibold text-cyan-500">SIGN IN</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

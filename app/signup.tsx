import React, { useState } from 'react';
import {View,Text,Image,TextInput,TouchableOpacity,ScrollView,KeyboardAvoidingView,Platform,} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Link } from 'expo-router';

export default function SignUpPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const router = useRouter();

  const handleSignUp = () => {
    console.log({ name, email, password, confirmPassword, termsAccepted });
    router.navigate('/');
  };

  return (
    <LinearGradient
      colors={['#E0C3FC', '#CBB4F4', '#FFFFFF']}
      className="flex-1"
    >
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
          <Text className="text-3xl font-bold text-center mt-8 mb-8 text-[#5B49E9]">
            Create your account
          </Text>

          {/* Form Fields */}
          <View className="w-full px-8">
            <Text className="text-base font-semibold mb-2 text-[#5B49E9]">Name</Text>
            <TextInput
              className="w-full h-12 px-4 bg-white/60 rounded-2xl mb-4 border border-purple-200"
              placeholder="Your full name"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />

            <Text className="text-base font-semibold mb-2 text-[#5B49E9]">Email</Text>
            <TextInput
              className="w-full h-12 px-4 bg-white/60 rounded-2xl mb-4 border border-purple-200"
              placeholder="ex: jon.smith@email.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Text className="text-base font-semibold mb-2 text-[#5B49E9]">Password</Text>
            <TextInput
              className="w-full h-12 px-4 bg-white/60 rounded-2xl mb-4 border border-purple-200"
              placeholder="********"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Text className="text-base font-semibold mb-2 text-[#5B49E9]">Confirm password</Text>
            <TextInput
              className="w-full h-12 px-4 bg-white/60 rounded-2xl mb-6 border border-purple-200"
              placeholder="********"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
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
            style={{ backgroundColor: '#B4A2FF' }}
            onPress={handleSignUp}
          >
            <Text className="text-white font-bold text-xl">SIGN UP</Text>
          </TouchableOpacity>

          {/* Footer */}
          <View className="flex-row mt-8 mb-10">
            <Text className="text-base text-gray-500">Have an account? </Text>
            <Link href="/login" asChild>
              <TouchableOpacity>
                <View>
                  <Text className="text-base font-semibold text-cyan-500">SIGN IN</Text>
                </View>
              </TouchableOpacity>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
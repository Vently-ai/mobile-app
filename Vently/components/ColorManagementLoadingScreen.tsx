import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export function ColorManagementLoadingScreen() {
    return (
        <LinearGradient
            colors={['#E0C3FC', '#CBB4F4', '#FFFFFF']}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
            <View className="items-center justify-center gap-4">
                <View className="bg-white/90 p-1 rounded-[24px]">
                    <Image
                        source={require('../assets/venltIcon.png')}
                        style={{ width: 100, height: 100 }}
                        resizeMode="contain"
                    />
                </View>
                <Text className="text-white text-2xl font-bold tracking-widest uppercase opacity-80">
                    Vently.AI
                </Text>
            </View>
        </LinearGradient>
    );
}

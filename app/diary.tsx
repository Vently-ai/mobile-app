import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ScrollView, Modal, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const PAGES = [
  {
    id: '1',
    date: '2026-02-10',
    title: 'My Diary',
    body: `Today I don't feel like doing anything. I just wanna lay in my bed.`,
  },
  {
    id: '2',
    date: '2026-02-09',
    title: 'My Diary',
    body: `Feeling shitty in my bed, didn't take my f**king meds, hyperpop up in my ears, everything just dissapears, don't wanna be someone else, just don't wanna hate myself, instead I'm wanna feel good.`,
  },
  {
    id: '3',
    date: '2026-02-08',
    title: 'My Diary',
    body: `Never gonna give you up, Never gonna let you down, Never gonna run around and desert you. Never gonna make you cry, Never gonna say goodbye, Never gonna tell a lie and hurt you.`,
  },
  {
    id: '4',
    date: '2026-02-05',
    title: 'My Diary',
    body: `I'll blow up into smithereens and spew my tiny symphony all up and down a city street while tryna put my mind at ease like finishing this melody this feels like a necessity so this could be the death of me or maybe just a better me now, come in with the timpanis and take a shot of Hennessy I know I'm not there mentally but you could be the remedy so let me play my violin for you`,
  },
  {
    id: '5',
    date: '2026-02-04',
    title: 'My Diary',
    body: `Don't you want me like I want you, baby don't you need me like I need you now sleep tomorrow but tonight go crazy all you gotta do is just meet me at the`,
  },
];

export default function DiaryPage() {
  const [index, setIndex] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [pages] = useState(PAGES);

  const current = pages[index];

  const params = useLocalSearchParams();
  const router = useRouter();
  useEffect(() => {
    const paramDate = params.date as string | undefined;
    if (paramDate) {
      const parsed = new Date(paramDate);
      if (!isNaN(parsed.getTime())) {
        const found = pages.findIndex(p => {
          const pd = new Date(p.date);
          if (isNaN(pd.getTime())) return false;
          return pd.getFullYear() === parsed.getFullYear() && pd.getMonth() === parsed.getMonth() && pd.getDate() === parsed.getDate();
        });
        if (found >= 0) {
          setIndex(found);
          setShowDatePicker(false);
        }
      }
    }
  }, [params.date]);

  const handleSelectDate = (selectedIndex: number) => {
    setIndex(selectedIndex);
    setShowDatePicker(false);
  };

  return (
    <LinearGradient colors={['#E0C3FC', '#CBB4F4', '#FFFFFF']} style={{ flex: 1, alignItems: 'center' }}>
      <Modal
        visible={showDatePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: 'white', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: 384 }}>
            <Text style={{ fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 12, color: '#1F2937' }}>Select a Date</Text>
            <FlatList
              data={pages}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index: itemIndex }) => (
                <TouchableOpacity
                  onPress={() => handleSelectDate(itemIndex)}
                  style={{ paddingVertical: 12, paddingHorizontal: 12, marginBottom: 8, backgroundColor: '#F5F3FF', borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#6B21A8' }}>{item.title}</Text>
                  <Text style={{ fontSize: 12, color: '#6D28D9' }}>{item.date}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              onPress={() => setShowDatePicker(false)}
              style={{ marginTop: 16, paddingVertical: 12, backgroundColor: '#6D28D9', borderRadius: 12, alignItems: 'center' }}
            >
              <Text style={{ color: 'white', textAlign: 'center', fontWeight: '700' }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ paddingTop: 56, paddingHorizontal: 24, paddingBottom: 16, width: '100%' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
          <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={{ marginRight: 12 }}>
            <Ionicons name="calendar" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ color: 'white', textAlign: 'left', fontSize: 20, fontWeight: '700' }}>{current.title}</Text>
        </View>
      </View>

      <View style={{ width: width - 48, height: 520, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'white',
              borderRadius: 24,
              padding: 28,
            }}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={{ color: '#5B49E9', fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 12 }}>
                {current.title}
              </Text>
              <Text style={{ color: '#222', fontSize: 14, lineHeight: 22 }}>
                {current.body}
              </Text>
            </ScrollView>
            <Text style={{ position: 'absolute', right: 20, bottom: 16, color: '#9C89FF', fontSize: 12 }}>
              {current.date}
            </Text>
          </View>
        </View>
      </View>


      <View style={{ width: width - 48, marginTop: 18, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => index > 0 && setIndex(index - 1)}
          disabled={index === 0}
          style={{ padding: 8 }}
        >
          <Ionicons name="chevron-back" size={28} color={index === 0 ? '#CCC' : '#5B49E9'} />
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {pages.map((p, i) => (
            <View
              key={p.id}
              style={{
                width: i === index ? 24 : 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: i === index ? '#5B49E9' : '#E8DFFF',
                marginHorizontal: 4,
              }}
            />
          ))}
        </View>

        <TouchableOpacity
          onPress={() => index < PAGES.length - 1 && setIndex(index + 1)}
          disabled={index === PAGES.length - 1}
          style={{ padding: 8 }}
        >
          <Ionicons name="chevron-forward" size={28} color={index === PAGES.length - 1 ? '#CCC' : '#5B49E9'} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
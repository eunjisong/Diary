import React, { useEffect, useState } from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { RootStackParamList } from '../navigation/types';

const storage = new MMKV();

const moodIcons: { [key: string]: string } = {
  happy: 'smile',
  sad: 'frown',
  angry: 'thumbs-down',
  neutral: 'thumbs-up',
};

const HomeScreen = ({ navigation }: any) => {
  type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Main'>;
  const route = useRoute<HomeScreenRouteProp>();
  const preloadedDiaries = route.params?.screen === 'Home' ? route.params?.params?.preloadedDiaries : undefined;
  const [groupedDiaries, setGroupedDiaries] = useState(
    preloadedDiaries ? groupDiaries(preloadedDiaries) : null
  );

  
  useFocusEffect(
    React.useCallback(() => {
      if (groupedDiaries === null) {
        loadDiaries();
      }
    }, [])
  );

  useEffect(() => {
    if (groupedDiaries === null) {
      loadDiaries();
    }
  }, []);

  const loadDiaries = () => {
    const keys = storage.getAllKeys();
    const diaries: { date: string; text: string; mood: string }[] = [];

    keys.forEach((key) => {
      if (!key.startsWith('USER_') && key !== 'last_updated' && key !== 'cached_coins') {
        const storedData = storage.getString(key);
        if (storedData) {
          try {
            const parsedData = JSON.parse(storedData);
            diaries.push({ date: key, text: parsedData.text || '', mood: parsedData.mood || '' });
          } catch (error) {
            console.error('Error parsing diary data:', error);
          }
        }
      }
    });

    setGroupedDiaries(groupDiaries(diaries));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📅 월별 일기 목록</Text>
      {groupedDiaries === null ? null : groupedDiaries.length === 0 ? (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>일기가 하나도 없습니다.</Text>
    <TouchableOpacity
      style={styles.writeButton}
      onPress={() => navigation.navigate('쓰기')}
    >
      <Text style={styles.buttonText}>✏️ 일기 쓰러 가기</Text>
    </TouchableOpacity>
  </View>
) : (
        <SectionList
          sections={groupedDiaries}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('일기 보기', { date: item.date, text: item.text, mood: item.mood })}>
              <View style={styles.card}>
                <View style={styles.rowContainer}>
                  <Text style={styles.dateText}>{item.date}</Text>
                  {item.mood ? <Icon name={moodIcons[item.mood]} size={20} color="black" style={styles.moodIcon} /> : null}
                </View>
                <Text style={styles.diaryText} numberOfLines={2}>{item.text}</Text>
              </View>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => <Text style={styles.sectionHeader}>{title}</Text>}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

// 일기 데이터를 월별로 그룹화
const groupDiaries = (diaries: { date: string; text: string; mood: string }[]) => {
  diaries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const grouped: { [key: string]: { date: string; text: string; mood: string }[] } = {};
  diaries.forEach((diary) => {
    const monthKey = diary.date.slice(0, 7);
    if (!grouped[monthKey]) grouped[monthKey] = [];
    grouped[monthKey].push(diary);
  });

  return Object.keys(grouped)
    .sort((a, b) => new Date(`${b}-01`).getTime() - new Date(`${a}-01`).getTime())
    .map((month) => ({
      title: month,
      data: grouped[month],
    }));
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#eee',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    borderRadius: 5,
  },
  listContainer: { paddingBottom: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  dateText: { fontSize: 16, fontWeight: 'bold' },
  moodIcon: { marginLeft: 10 },
  diaryText: { fontSize: 14, color: '#333' },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  writeButton: {
    backgroundColor: '#008CBA',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



export default HomeScreen;

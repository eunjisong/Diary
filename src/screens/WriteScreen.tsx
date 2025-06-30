import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';
import { useFocusEffect } from '@react-navigation/native';

const storage = new MMKV();

const WriteScreen = ({ navigation }: any) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [mood, setMood] = useState('');
  const [diaryText, setDiaryText] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isDiaryChanged, setIsDiaryChanged] = useState(false);
  const [isNewEntry, setIsNewEntry] = useState(false);
  const autoSaveTimeout = useRef<NodeJS.Timeout | null>(null);

  // 스토리지에서 데이터 로드
  const loadDiaryData = () => {
    const storedDiary = storage.getString(selectedDate);
    if (storedDiary) {
      try {
        const { text, mood } = JSON.parse(storedDiary);
        setDiaryText(text || '');
        setMood(mood || '');
        setIsSaved(true);
      } catch (error) {
        console.error('Error parsing stored diary:', error);
      }
    } else {
      setDiaryText('');
      setMood('');
      setIsSaved(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadDiaryData();
    }, [selectedDate])
  );

  useEffect(() => {
    loadDiaryData();
  }, [selectedDate]);

  useEffect(() => {
    if (isDiaryChanged) {
      if (autoSaveTimeout.current) clearTimeout(autoSaveTimeout.current);
      autoSaveTimeout.current = setTimeout(() => {
        handleSave(true);
      }, 2000);
    }
    return () => {
      if (autoSaveTimeout.current) clearTimeout(autoSaveTimeout.current);
    };
  }, [diaryText, mood]);


  const handleSave = (autoSave = false) => {
    if (!diaryText.trim()) return;

    const existingDiary = storage.getString(selectedDate);
    const diaryData = JSON.stringify({ text: diaryText, mood });
    if (autoSave) {
      storage.set(selectedDate, diaryData);
      setIsSaved(true);
      setIsDiaryChanged(false);
      return;
    }

    if (!existingDiary) {
      storage.set(selectedDate, diaryData);
      setIsSaved(true);
      setIsDiaryChanged(false);
      setIsNewEntry(false);
      navigation.navigate('홈', { refresh: true });
      return;
    }

    if (!isNewEntry) {
      console.log('yos3')
      storage.set(selectedDate, diaryData);
      setIsSaved(true);
      setIsDiaryChanged(false);
      navigation.navigate('홈', { refresh: true });
      return;
    }

    Alert.alert(
      '이미 저장된 일기가 있습니다',
      '덮어쓰시겠습니까, 아니면 기존 일기에 추가하시겠습니까?',
      [
        {
          text: '덮어쓰기',
          onPress: () => {
            storage.set(selectedDate, diaryData);
            setIsSaved(true);
            setIsDiaryChanged(false);
            setIsNewEntry(false);
          },
        },
        {
          text: '추가',
          onPress: () => {
            try {
              const existingData = JSON.parse(existingDiary);
              const updatedText = existingData.text + '\n\n' + diaryText;
              storage.set(selectedDate, JSON.stringify({ text: updatedText, mood }));
              setDiaryText(updatedText);
              setIsSaved(true);
              setIsDiaryChanged(false);
              setIsNewEntry(false);
            } catch (error) {
              console.error('Error updating diary:', error);
            }
          },
        },
        { text: '취소', style: 'cancel' },
      ]
    );
  };

  const handleMoodSelect = (selectedMood: string) => {
    setMood(selectedMood);
    setIsDiaryChanged(true);
    setIsSaved(false);
  };

  const handleNewDiary = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setDiaryText('');
    setIsSaved(false);
    setMood('');
    setIsDiaryChanged(false);
    setIsNewEntry(true);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={{ flex: 1 }}>

          <View style={styles.dateMoodContainer}>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowCalendar(!showCalendar)}>
              <Text testID='calendarButton' style={styles.dateText}>{selectedDate}</Text>
            </TouchableOpacity>

            <View style={styles.moodContainer}>
              <TouchableOpacity onPress={() => handleMoodSelect('happy')}>
                <Icon name="smile" size={40} color={mood === 'happy' ? 'black' : 'gray'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMoodSelect('sad')}>
                <Icon name="frown" size={40} color={mood === 'sad' ? 'black' : 'gray'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMoodSelect('angry')}>
                <Icon name="thumbs-down" size={40} color={mood === 'angry' ? 'black' : 'gray'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleMoodSelect('neutral')}>
                <Icon name="thumbs-up" size={40} color={mood === 'neutral' ? 'black' : 'gray'} />
              </TouchableOpacity>
            </View>
          </View>

          {showCalendar && (
            <Calendar
              current={selectedDate}
              onDayPress={(day: { dateString: string }) => {
                setSelectedDate(day.dateString);
                setShowCalendar(false);
              }}
              dayComponent={({ date, state }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedDate(date.dateString);
                      setShowCalendar(false);
                    }}
                    testID={`${date.dateString}`}
                  >
                    <Text style={{ color: state === 'disabled' ? 'gray' : 'black' }}>
                      {date.day}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}

          <View style={styles.textAreaContainer}>
            <TextInput
              testID='writeInputField'
              style={styles.textArea}
              multiline
              value={diaryText}
              onChangeText={(text) => {
                setDiaryText(text);
                setIsDiaryChanged(true);
                setIsSaved(false);
              }}
              placeholder="오늘의 일기를 작성하세요"

            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.newDiaryButton,
                { backgroundColor: diaryText.trim() ? '#4CAF50' : '#B0BEC5' },
              ]}
              onPress={handleNewDiary}
              disabled={!diaryText.trim()}
            >
              <Text style={styles.buttonText}>새 일기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.saveButton,
                { backgroundColor: !isDiaryChanged ? '#B0BEC5' : '#008CBA' },
              ]}
              onPress={() => handleSave()}
              disabled={!isDiaryChanged}
            >
              <Text style={styles.buttonText}>{isSaved ? '저장됨' : '저장'}</Text>
            </TouchableOpacity>
          </View>
        
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  dateMoodContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  dateButton: { padding: 10, backgroundColor: '#e0e0e0', borderRadius: 5 },
  dateText: { fontSize: 20 },
  moodContainer: { flexDirection: 'row', alignItems: 'center' },
  textAreaContainer: { flex: 1, marginBottom: 20 },
  textArea: { borderColor: '#ccc', borderWidth: 1, padding: 10, fontSize: 16, height: '100%', textAlignVertical: 'top' },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, marginBottom: 30 },
  newDiaryButton: { padding: 10, borderRadius: 5, flex: 0.48, alignItems: 'center' },
  saveButton: { padding: 10, borderRadius: 5, flex: 0.48, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16 },

});

export default WriteScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/Feather';

const storage = new MMKV();
const moodIcons: { [key: string]: string } = {
  happy: 'smile',
  sad: 'frown',
  angry: 'thumbs-down',
  neutral: 'thumbs-up',
};

const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { date, text, mood } = route.params as { date: string; text: string; mood: string };

  const [selectedDate, setSelectedDate] = useState(date);
  const [editedText, setEditedText] = useState(text);
  const [selectedMood, setSelectedMood] = useState(mood);
  const [isEditing, setIsEditing] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [originalDate, setOriginalDate] = useState(date); // 기존 날짜 저장

  // 저장된 데이터 불러오기
  useEffect(() => {
    const storedDiary = storage.getString(selectedDate);
    if (storedDiary) {
      try {
        const { text, mood } = JSON.parse(storedDiary);
        setEditedText(text || '');
        setSelectedMood(mood || '');
      } catch (error) {
        console.error('Error parsing stored diary:', error);
      }
    }
  }, [selectedDate]);

  // 수정 완료 후 저장
  const handleSaveEdit = () => {
    if (!editedText.trim()) {
      Alert.alert('경고', '내용을 입력해주세요.');
      return;
    }

    const diaryData = JSON.stringify({ text: editedText, mood: selectedMood });

    // 날짜가 변경된 경우 기존 날짜 데이터 삭제 후 새로운 날짜에 저장
    if (originalDate !== selectedDate) {
      storage.delete(originalDate);
      setOriginalDate(selectedDate);
    }

    storage.set(selectedDate, diaryData);
    setIsEditing(false);
    setIsChanged(false);
  };

  // 삭제 기능
  const handleDelete = () => {
    Alert.alert('삭제 확인', '정말 이 일기를 삭제하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '삭제',
        style: 'destructive',
        onPress: () => {
          storage.delete(selectedDate);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* 날짜 및 기분 선택 */}
      <View style={styles.dateMoodContainer}>
        <TouchableOpacity
          style={[styles.dateButton]}
          onPress={() => isEditing && setShowCalendar(!showCalendar)}
          disabled={!isEditing}
        >
          <Text style={styles.dateText}>{selectedDate}</Text>
        </TouchableOpacity>

        <View style={styles.moodContainer}>
          {Object.keys(moodIcons).map((moodKey) => (
            <TouchableOpacity
              key={moodKey}
              onPress={() => {
                if (isEditing) {
                  setSelectedMood(moodKey);
                  setIsChanged(true);
                }
              }}
              disabled={!isEditing}
            >
              <Icon
                testID={`mood_${moodKey}`}
                name={moodIcons[moodKey]}
                size={40}
                color={selectedMood === moodKey ? 'black' : 'gray'}
              />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 날짜 선택 캘린더 */}
      {showCalendar && (
        <Calendar
          current={selectedDate}
          onDayPress={(day: { dateString: string }) => {
            if (isEditing) {
              setSelectedDate(day.dateString);
              setIsChanged(true);
            }
            setShowCalendar(false);
          }}
        />
      )}

      {/* 일기 작성 영역 */}
      <View style={styles.textAreaContainer}>
        {isEditing ? (
          <TextInput
            style={styles.textArea}
            multiline
            value={editedText}
            onChangeText={(text) => {
              setEditedText(text);
              setIsChanged(true);
            }}
          />
        ) : (
          <Text style={styles.diaryText}>{editedText}</Text>
        )}
      </View>

      {/* 삭제 & 저장 버튼 */}
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity style={[styles.deleteButton, styles.buttonSpacing]} onPress={handleDelete}>
              <Text style={styles.buttonText}>삭제</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.saveButton,
                styles.buttonSpacing,
                { backgroundColor: isChanged ? '#008CBA' : '#B0BEC5' }, // 변경이 없으면 비활성화
              ]}
              onPress={handleSaveEdit}
              disabled={!isChanged}
            >
              <Text style={styles.buttonText}>저장</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>수정</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  dateMoodContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  dateButton: { padding: 10, backgroundColor: '#e0e0e0', borderRadius: 5 },
  dateText: { fontSize: 20 },
  moodContainer: { flexDirection: 'row', alignItems: 'center' },
  textAreaContainer: { flex: 1, marginBottom: 20 },
  textArea: { borderColor: '#ccc', borderWidth: 1, padding: 10, fontSize: 16, height: '100%',   textAlignVertical: 'top'  },
  diaryText: { fontSize: 16, color: '#333', padding: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  buttonSpacing: { marginHorizontal: 5 },
  editButton: { backgroundColor: '#008CBA', padding: 10, borderRadius: 5, flex: 1, alignItems: 'center' },
  saveButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 5, flex: 1, alignItems: 'center' },
  deleteButton: { backgroundColor: 'red', padding: 10, borderRadius: 5, flex: 1, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16 },
});

export default DetailScreen;

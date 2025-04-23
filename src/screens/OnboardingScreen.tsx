import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, ScrollView, Platform } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';

const storage = new MMKV();
const DEFAULT_PROFILE_IMAGE = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

const OnboardingScreen = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'female' | 'male' | 'other' | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(DEFAULT_PROFILE_IMAGE);
  const [open, setOpen] = useState(false);

  const isFormComplete = name.trim() !== '' && age.trim() !== '' && gender !== null && profileImage !== null;

  const handleSubmit = () => {
    if (isFormComplete) {
      storage.set('USER_name', name);
      storage.set('USER_age', age);
      storage.set('USER_gender', gender);
      storage.set('USER_profileImage', profileImage);

      navigation.replace('Main');
    }
  };

  const handlePickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.assets && response.assets[0].uri) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>일기쓰기</Text>
          {/* 프로필 사진 */}
          <View style={styles.profileContainer}>

            <Image source={{ uri: profileImage || DEFAULT_PROFILE_IMAGE }} style={styles.image} />
            <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
              <Text style={styles.imageButtonText}>사진 선택</Text>
            </TouchableOpacity>
          </View>

          {/* 입력 필드 */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>이름</Text>
            <TextInput style={styles.input} placeholder="이름 입력" value={name} onChangeText={setName} />

            <Text style={styles.label}>나이</Text>
            <TextInput style={styles.input} returnKeyType='done' placeholder="나이 입력" value={age} onChangeText={setAge} keyboardType="numeric" />

            <Text style={styles.label}>성별</Text>
            <DropDownPicker
              items={[
                { label: '여', value: '여자' },
                { label: '남', value: '남자' }
              ]}
              value={gender}
              setValue={setGender}
              placeholder="성별 선택"
              open={open}
              setOpen={setOpen}
              containerStyle={styles.dropdown}
              style={styles.dropdownList}
              zIndex={1000}
            />
          </View>

          {/* 완료 버튼 */}
          <TouchableOpacity
            style={[styles.submitButton, !isFormComplete && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={!isFormComplete}
          >
            <Text style={styles.submitButtonText}>완료</Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 100, textAlign: 'center' },

  profileContainer: { alignItems: 'center', marginBottom: 20 },
  image: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  imageButton: { backgroundColor: '#008CBA', padding: 8, borderRadius: 5 },
  imageButtonText: { color: 'white', fontSize: 16 },

  inputContainer: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, padding: 10, borderRadius: 5, marginBottom: 15, borderColor: '#ddd' },

  dropdown: { marginBottom: 10 },
  dropdownList: { backgroundColor: 'white' },

  submitButton: { backgroundColor: '#008CBA', padding: 12, borderRadius: 5, alignItems: 'center' },
  submitButtonDisabled: { backgroundColor: '#B0BEC5' },
  submitButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default OnboardingScreen;

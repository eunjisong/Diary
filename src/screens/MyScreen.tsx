import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import { launchImageLibrary } from 'react-native-image-picker';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

const storage = new MMKV();
const DEFAULT_PROFILE_IMAGE = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';

const MyScreen = () => {
  type NavigationProp = StackNavigationProp<RootStackParamList, 'My'>; // 'MyScreen'을 해당 화면 이름으로 변경
  const navigation = useNavigation<NavigationProp>();
  const [profileImage, setProfileImage] = useState<string | null>(DEFAULT_PROFILE_IMAGE);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [genderValue, setGenderValue] = useState<string | null>(null);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const storedName = storage.getString('USER_name');
    const storedAge = storage.getString('USER_age');
    const storedGender = storage.getString('USER_gender');
    const storedProfileImage = storage.getString('USER_profileImage');

    if (storedName) setName(storedName);
    if (storedAge) setAge(storedAge);
    if (storedGender) {
      setGender(storedGender);
      setGenderValue(storedGender);
    }
    if (storedProfileImage) setProfileImage(storedProfileImage);
  }, []);

  const handleLogout = () => {
    Alert.alert('로그아웃', '모든 정보가 사라집니다. 정말 로그아웃 하시겠습니까?', [
      { text: '취소', style: 'cancel' },
      {
        text: '확인',
        style: 'destructive',
        onPress: () => {
          storage.clearAll();
          navigation.replace('Onboarding');
        },
      },
    ]);
  };

  const saveProfile = () => {
    storage.set('USER_name', name);
    storage.set('USER_age', age);
    storage.set('USER_gender', genderValue || '');
    storage.set('USER_profileImage', profileImage || DEFAULT_PROFILE_IMAGE);
    setGender(genderValue || '');
    setIsEditing(false);
    setIsChanged(false);
  };

  const changeProfileImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.assets && response.assets[0].uri) {
        setProfileImage(response.assets[0].uri);
        setIsChanged(true);
      }
    });
  };

  const cancelEdit = () => {
    setName(storage.getString('USER_name') || '');
    setAge(storage.getString('USER_age') || '');
    setGender(storage.getString('USER_gender') || '');
    setProfileImage(storage.getString('USER_profileImage') || DEFAULT_PROFILE_IMAGE);
    setIsEditing(false);
    setIsChanged(false);
  };


  return (
    <View style={styles.container}>
      {/* 프로필 사진 (중앙 정렬, 높이 고정) */}
      <View style={styles.profileContainer}>
        <Image source={{ uri: profileImage || DEFAULT_PROFILE_IMAGE }} style={styles.profileImage} />
        {isEditing && (
          <TouchableOpacity style={styles.changePhotoButton} onPress={changeProfileImage}>
            <Text style={styles.changePhotoText}>사진 변경</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 프로필 정보 (좌측 정렬, 패딩 추가) */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>이름:</Text>
        {isEditing ? (
          <TextInput testID="name_input" style={styles.input} returnKeyType="done" value={name} onChangeText={(text) => { setName(text); setIsChanged(true); }} />
        ) : (
          <Text testID='name_value' style={styles.text}>{name}</Text>
        )}

        <Text style={styles.label}>나이:</Text>
        {isEditing ? (
          <TextInput testID="age_input" style={styles.input} value={age} keyboardType="numeric"      
          returnKeyType="done"          
          onChangeText={(text) => { setAge(text); setIsChanged(true); }} />
        ) : (
          <Text testID='age_value' style={styles.text}>{age}</Text>
        )}

<Text style={styles.label}>성별:</Text>
{isEditing ? (
  <View style={styles.radioContainer}>
    {['여자', '남자'].map((item) => {
      const isSelected = genderValue === item;
      return (
        <TouchableOpacity
          key={item}
          style={[
            styles.radioButton,
            {
              backgroundColor: isSelected ? '#008CBA' : '#fff',
              borderColor: isSelected ? '#008CBA' : '#ccc'
            }
          ]}
          onPress={() => {
            setGenderValue(item);
            setIsChanged(true);
          }}
        >
          <Text style={[styles.radioText, { color: isSelected ? '#fff' : '#000' }]}>
            {item}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
) : (
  <Text testID="gender_value" style={styles.text}>{gender}</Text>
)}

      </View>

      {/* 버튼 (하단 정렬) */}
      <View style={styles.buttonContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity style={[styles.cancelButton, { marginRight: 10 }]} onPress={cancelEdit}>
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: isChanged ? '#008CBA' : '#B0BEC5' }]}
              onPress={saveProfile}
              disabled={!isChanged}
            >
              <Text style={styles.buttonText}>저장</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity style={[styles.logoutButton, { marginRight: 10 }]} onPress={handleLogout}>
              <Text style={styles.buttonText}>로그아웃</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Text style={styles.buttonText}>수정</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  profileContainer: { alignItems: 'center', marginBottom: 20, height: 130 }, // ✅ 높이 고정
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  changePhotoButton: { position: 'absolute', bottom: 0 },
  changePhotoText: { color: '#008CBA', fontSize: 16 },

  infoContainer: { alignItems: 'flex-start', paddingTop: 10 },
  label: { paddingVertical: 10, fontSize: 16, fontWeight: 'bold', paddingBottom: 10 },
  text: { padding: 5, fontSize: 16, marginBottom: 10 },
  input: { paddingVertical: 10, borderWidth: 0.5, padding: 10, width: '100%', borderRadius: 5 },

  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 'auto' },
  logoutButton: { flex: 1, backgroundColor: 'red', padding: 12, borderRadius: 5, alignItems: 'center' },
  editButton: { flex: 1, backgroundColor: '#008CBA', padding: 12, borderRadius: 5, alignItems: 'center' },
  saveButton: { flex: 1, padding: 12, borderRadius: 5, alignItems: 'center' },
  cancelButton: { flex: 1, backgroundColor: 'green', padding: 12, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 16 },
  
  radioContainer: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 12
  },
  radioButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderWidth: 1,
    marginRight: 12
  },
  radioText: {
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

export default MyScreen;

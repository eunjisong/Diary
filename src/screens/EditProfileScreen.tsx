import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { useNavigation } from '@react-navigation/native';

const storage = new MMKV();

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState(storage.getString('name') || '');
  const [age, setAge] = useState(storage.getString('age') || '');
  const [gender, setGender] = useState(storage.getString('gender') || '');

  const saveProfile = () => {
    storage.set('name', name);
    storage.set('age', age);
    storage.set('gender', gender);
    
    navigation.goBack(); // 마이 프로필 화면으로 돌아가기
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput style={styles.input} placeholder="이름" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="나이" value={age} onChangeText={setAge} keyboardType="numeric" />
      <TextInput style={styles.input} placeholder="성별" value={gender} onChangeText={setGender} />
      <Button title="저장" onPress={saveProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
});

export default EditProfileScreen;

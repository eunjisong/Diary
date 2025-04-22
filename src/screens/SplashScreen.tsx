import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import Icon from 'react-native-vector-icons/Feather';

const storage = new MMKV();

const SplashScreen = ({ navigation}: any ) => {

  const fadeAnim = new Animated.Value(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    preloadData().then((preloadedDiaries) => {
      const storedName = storage.getString('USER_name');

      if (storedName) {
        navigation.replace('Main', { screen: '홈', params: { preloadedDiaries } });
      } else {
        navigation.replace('Onboarding');
      }

      setIsLoading(false);
    });
  }, []);

  // ✅ 일기 데이터 미리 불러오기
  const preloadData = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const keys = storage.getAllKeys();
        const diaries = keys
          .filter((key) => !key.startsWith('USER_') && key !== 'last_updated' && key !== 'cached_coins')
          .map((key) => {
            const storedData = storage.getString(key);
            return storedData ? { date: key, ...JSON.parse(storedData) } : null;
          })
          .filter(Boolean);

        diaries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        resolve(diaries);
      }, 1000);
    });
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Icon name="edit-3" size={80} color="#008CBA" />
        </Animated.View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
});

export default SplashScreen;

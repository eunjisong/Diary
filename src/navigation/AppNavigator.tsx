import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import WriteScreen from '../screens/WriteScreen';
import TokenScreen from '../screens/TokenScreen';
import MyScreen from '../screens/MyScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import DetailScreen from '../screens/DetailScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';
import { TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

// ✅ HomeStackNavigator를 별도 컴포넌트로 분리
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="일기리스트" component={HomeScreen} />
      <HomeStack.Screen name="일기보기" component={DetailScreen} />
    </HomeStack.Navigator>
  );
};

// ✅ BottomTabNavigator 수정 (아이콘 추가 & 클릭 효과 제거)
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          if (route.name === '홈') iconName = 'home';
          else if (route.name === '쓰기') iconName = 'edit';
          else if (route.name === '토큰') iconName = 'dollar-sign';
          else if (route.name === '프로필') iconName = 'user';
          else iconName = 'help-circle'; // 기본 아이콘

          return <Icon name={iconName} size={size} color={focused ? '#008CBA' : 'gray'} />;
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
        tabBarActiveTintColor: '#008CBA',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#fff', height: 60, paddingBottom: 5 },
        tabBarPressColor: 'transparent', // ✅ 클릭 시 배경색 변경 방지
        tabBarButton: (props) => <TouchableOpacity activeOpacity={1} {...props} />, // ✅ 클릭 애니메이션 제거
      })}
    >
      <Tab.Screen name="홈" component={HomeStackNavigator} options={{ headerShown: false }} />
      <Tab.Screen name="쓰기" component={WriteScreen} />
      <Tab.Screen name="토큰" component={TokenScreen} />
      <Tab.Screen name="프로필" component={MyScreen} />
    </Tab.Navigator>
  );
};

// ✅ AppNavigator에서 DetailScreen 제거
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

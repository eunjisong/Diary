import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import WriteScreen from '../screens/WriteScreen';
import TokenScreen from '../screens/TokenScreen';
import MyScreen from '../screens/MyScreen';
import DetailScreen from '../screens/DetailScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

// HomeStackNavigator를 별도 컴포넌트로 분리
const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator >
      <HomeStack.Screen name="일기 리스트" component={HomeScreen} />
      <HomeStack.Screen name="일기 보기" component={DetailScreen} />
    </HomeStack.Navigator>
  );
};

// BottomTabNavigator
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName: string;

          if (route.name === '홈') iconName = 'home';
          else if (route.name === '쓰기') iconName = 'edit';
          else if (route.name === '토큰') iconName = 'dollar-sign';
          else if (route.name === '프로필') iconName = 'user';
          else iconName = 'help-circle'; // 만약에 추가되면 기본 아이콘 설정

          return <Icon name={iconName} size={size} color={focused ? '#008CBA' : 'gray'} />;
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
        tabBarActiveTintColor: '#008CBA',
        tabBarInactiveTintColor: 'gray',

        tabBarStyle: { backgroundColor: '#fff', height: 80, paddingTop: 5, paddingBottom: 5 },
      })}
    >
      <Tab.Screen name="홈" component={HomeStackNavigator} options={{
        tabBarAccessibilityLabel: "홈",
        headerShown: false
      }} />
      <Tab.Screen name="쓰기" component={WriteScreen}
        options={{ tabBarAccessibilityLabel: "쓰기" }}
      />
      <Tab.Screen name="토큰" component={TokenScreen}
        options={{ tabBarAccessibilityLabel: "토큰" }}
      />
      <Tab.Screen name="프로필" component={MyScreen}
        options={{ tabBarAccessibilityLabel: "프로필" }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Main" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
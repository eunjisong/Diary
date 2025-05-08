import { StackNavigationProp } from '@react-navigation/stack';

// 스택 네비게이션 타입 정의
export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  My: undefined;
  EditProfile: undefined;
  Detail: { date: string; text: string; mood: string; }
  Main: { screen: keyof BottomTabParamList; params?: { preloadedDiaries?: any } }
};

// 바텀 탭 네비게이션 타입
export type BottomTabParamList = {
  Home: undefined;
  Write: undefined;
  Token: undefined;
  My: undefined;
};

// StackNavigationProp을 사용한 타입
export type RootStackNavigationProp = StackNavigationProp<RootStackParamList>;
export type MyScreenNavigationProp = StackNavigationProp<RootStackParamList, 'My'>;
export type OnboardingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;
export type DetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Detail'>;

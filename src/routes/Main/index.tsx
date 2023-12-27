// src/routes/Main/index.tsx
import React from 'react'
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer' // 追加
import Ionicons from '@expo/vector-icons/Ionicons'
import { INITIAL, LOADING, HOME, CHOOSE_LOGIN, STATISTICS, USER_INFO } from '../../constants/path' // USER_INFOを追加
import { Initial, Loading, ChooseLogin } from '../../components/pages'
import Home from './Home'
import Statistics from './Statistics'
import UserInfo from './UserInfo' // 追加
import * as UiContext from '../../contexts/ui'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const HomeDrawer = createDrawerNavigator() // 追加
const StatisticsDrawer = createDrawerNavigator() // 追加
const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
})
// 追加
function HomeWithDrawer() {
  return (
    <HomeDrawer.Navigator initialRouteName={HOME} screenOptions={{ headerShown: false }}>
      <HomeDrawer.Screen name={HOME} component={Home} />
      <HomeDrawer.Screen name={USER_INFO} component={UserInfo} />
    </HomeDrawer.Navigator>
  )
}
// 追加
function StatisticsWithDrawer() {
  return (
    <StatisticsDrawer.Navigator screenOptions={{ headerShown: false }}>
      <StatisticsDrawer.Screen name={STATISTICS} component={Statistics} />
      <StatisticsDrawer.Screen name={USER_INFO} component={UserInfo} />
    </StatisticsDrawer.Navigator>
  )
}
// Componentを追加
function TabRoutes() {
  return (
    <Tab.Navigator initialRouteName={HOME} screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name={HOME}
        component={HomeWithDrawer}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name={STATISTICS}
        component={StatisticsWithDrawer}
        options={{
          tabBarLabel: 'Statistics',
          tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}
function switchingAuthStatus(status: UiContext.Status) {
  switch (status) {
    case UiContext.Status.UN_AUTHORIZED:
      return <Stack.Screen name={CHOOSE_LOGIN} component={ChooseLogin} />
    case UiContext.Status.AUTHORIZED:
      return <Stack.Screen name={HOME} component={TabRoutes} />
    case UiContext.Status.FIRST_OPEN:
    default:
      return <Stack.Screen name={INITIAL} component={Initial} />
  }
}
function AuthWithRoutes() {
  const uiContext = React.useContext(UiContext.Context)
  return (
    <Stack.Navigator
      initialRouteName={LOADING}
      screenOptions={{ headerShown: false, cardStyleInterpolator: forFade }}
    >
      {uiContext.applicationState !== UiContext.Status.LOADING ? (
        switchingAuthStatus(uiContext.applicationState)
      ) : (
        <Stack.Screen name={LOADING} component={Loading} />
      )}
    </Stack.Navigator>
  )
}
export default AuthWithRoutes

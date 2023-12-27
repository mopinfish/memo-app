import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createDrawerNavigator } from '@react-navigation/drawer'
import Ionicons from '@expo/vector-icons/Ionicons'
import {
  CHOOSE_LOGIN,
  HOME,
  INITIAL,
  LOADING,
  SIGN_IN,
  SIGN_UP,
  STATISTICS,
  USER_INFO,
  INPUT,
} from '../../constants/path'
import Home from './Home'
import UserInfo from './UserInfo'
import Statistics from './Statistics'
//import { ChooseLogin, Initial } from '../../components/pages'
//import { Loading, SignIn, SignUp, Input } from '../../containers'
import { Initial, Loading, ChooseLogin, Input, SignIn, SignUp } from '../../components/pages'
import { headerStyle, headerTintColor } from '../Header'
import * as UiContext from '../../contexts/ui'
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack'
import { COLOR } from '../../constants/theme'

const drawerStyle = {
  backgroundColor: COLOR.MAIN,
}
const HomeDrawer = createDrawerNavigator()

function HomeWithDrawer() {
  return (
    <HomeDrawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: drawerStyle,
        drawerActiveTintColor: COLOR.PRIMARY,
        drawerInactiveBackgroundColor: COLOR.GRAY,
      }}
      initialRouteName={HOME}
    >
      <HomeDrawer.Screen name={HOME} component={Home} />
      <HomeDrawer.Screen name={USER_INFO} component={UserInfo} />
    </HomeDrawer.Navigator>
  )
}

const StatisticsDrawer = createDrawerNavigator()
function StatisticsWithDrawer() {
  return (
    <StatisticsDrawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: drawerStyle,
        drawerActiveTintColor: COLOR.PRIMARY,
        drawerInactiveBackgroundColor: COLOR.GRAY,
      }}
    >
      <StatisticsDrawer.Screen name={STATISTICS} component={Statistics} />
      <StatisticsDrawer.Screen name={USER_INFO} component={UserInfo} />
    </StatisticsDrawer.Navigator>
  )
}
const cardStyle = {
  backgroundColor: COLOR.MAIN,
}

const Tab = createBottomTabNavigator()

function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          inactiveTintColor: COLOR.WHITE,
          activeTintColor: COLOR.PRIMARY,
          style: {
            backgroundColor: COLOR.MAIN,
          },
          headerShown: false,
          tabBarVisible: route.name !== USER_INFO,
        }
      }}
    >
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
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

const ModalStack = createStackNavigator()
function TabWithModalRoutes() {
  return (
    <ModalStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle,
      }}
    >
      <ModalStack.Screen name={HOME} component={TabRoutes} />
      <ModalStack.Screen
        name={INPUT}
        component={Input}
        options={{
          presentation: 'modal',
        }}
      />
    </ModalStack.Navigator>
  )
}
const ChooseLoginStack = createStackNavigator()
function ChooseLoginNavigator() {
  return (
    <ChooseLoginStack.Navigator
      screenOptions={{
        cardStyle,
        headerStyle,
        headerTintColor,
      }}
      initialRouteName={CHOOSE_LOGIN}
    >
      <ChooseLoginStack.Screen name={CHOOSE_LOGIN} component={ChooseLogin} />
      <ChooseLoginStack.Screen name={SIGN_IN} component={SignIn} options={{ title: 'SignIn' }} />
      <ChooseLoginStack.Screen name={SIGN_UP} component={SignUp} options={{ title: 'SignUp' }} />
    </ChooseLoginStack.Navigator>
  )
}

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
})
const Stack = createStackNavigator()
function switchingAuthStatus(status: UiContext.Status) {
  switch (status) {
    case UiContext.Status.UN_AUTHORIZED:
      return <Stack.Screen name={CHOOSE_LOGIN} component={ChooseLoginNavigator} />
    case UiContext.Status.AUTHORIZED:
      return <Stack.Screen name={HOME} component={TabWithModalRoutes} />
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

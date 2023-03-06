import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ManageDetails from './screens/ManageDetails';
import DetailsOverview from './screens/DetailsOverview';

import { GlobalStyles } from './constants/styles';
import AuthContextProvider, { AuthContext } from './details/auth-context';
import { useContext } from 'react';
import DetailsContextProvider from './details/details-context';


const Stack = createNativeStackNavigator();





function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}


function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
      }}
    >
      <Stack.Screen name='DetailsOverview' component={DetailsOverview} options={{ headerShown: false }} />
      <Stack.Screen name="ManageDetails" component={ManageDetails} options={{
        presentation: 'modal',
      }} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default function App() {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <DetailsContextProvider>
        <AuthContextProvider>

          <Navigation />

        </AuthContextProvider>
      </DetailsContextProvider>
      <StatusBar style="light" />
    </>
  );
}
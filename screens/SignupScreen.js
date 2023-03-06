import AuthContent from '../components/Auth/AuthContent';
import { useState } from 'react';

import LoadingOverlay from '../components/UI/LoadingOverlay';
import { createUser } from '../util/auth';
import { Alert } from 'react-native';
import { useContext } from 'react'
import { AuthContext } from '../details/auth-context';


function SignupScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        'Authentication failed',
        'Could not create user, please check your input and try again later.'
      );
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay />
  }
  return <AuthContent onAuthenticate={signupHandler} />;


}

export default SignupScreen;

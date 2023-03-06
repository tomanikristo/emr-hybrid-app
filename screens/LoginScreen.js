import AuthContent from '../components/Auth/AuthContent';
import { createUser, login } from '../util/auth';
import { useState, useContext } from 'react';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../details/auth-context';



function LoginScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext);


  async function loginHnadler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert('Authentication failed, wrong credentials!',
        'Make sude the credentials are correct or try again later!'
      );
      setIsAuthenticating(false);

    }

  }

  if (isAuthenticating) {
    return <LoadingOverlay />
  }
  return <AuthContent isLogin onAuthenticate={loginHnadler} />;
}

export default LoginScreen;

import firebaseConfig from './firebase.config';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { useContext } from 'react';
import AuthContext from '../../utils/auth-context';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { List, ListItem, ListItemIcon, Typography } from '@mui/material';
initializeApp(firebaseConfig);

const Login = () => {
  const authCtx = useContext(AuthContext);

  const signInWithGoogleHandler = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // const user = result.user;
      const expirationTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();
      authCtx.login(token, expirationTime);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  const signInWithFacebookHandler = async () => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // const user = result.user;
      const expirationTime = new Date(Date.now() + 60 * 60 * 1000).toISOString();
      authCtx.login(token, expirationTime);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };
  return (
    <div style={{ width: '50%', margin: '3rem auto 0' }}>
      <Typography variant="h2" sx={{ marginBottom: '2rem' }}>
        Login with
      </Typography>
      <List sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
        <ListItem onClick={signInWithGoogleHandler} sx={{ cursor: 'pointer' }}>
          <ListItemIcon>
            <GoogleIcon sx={{ color: 'blue', fontSize: '2rem' }} />
            <Typography
              variant="body1"
              sx={{ fontSize: '1.5rem', paddingLeft: '1rem', fontWeight: 'bold' }}
            >
              Google
            </Typography>
          </ListItemIcon>
        </ListItem>

        <ListItem onClick={signInWithFacebookHandler} sx={{ cursor: 'pointer' }}>
          <ListItemIcon>
            <FacebookIcon sx={{ color: 'blue', fontSize: '2rem' }} />
            <Typography
              variant="body1"
              sx={{ fontSize: '1.5rem', paddingLeft: '1rem', fontWeight: 'bold' }}
            >
              Facebook
            </Typography>
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
};

export default Login;

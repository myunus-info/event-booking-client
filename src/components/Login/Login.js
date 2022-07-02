import React from 'react';
import { signInWithGoogle, signInWithFacebook, initializeLoginFrameword } from './loginManager';
initializeLoginFrameword();

const Login = () => {
  return (
    <div>
      <button onClick={signInWithGoogle}>Login with Google</button>
      <button onClick={signInWithFacebook}>Login with Facebook</button>
    </div>
  );
};

export default Login;

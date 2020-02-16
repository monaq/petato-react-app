import React, { MutableRefObject, useRef, useEffect } from 'react';
import useLogin from './useLogin';

const Login = () => {
  const googleLoginBtn: MutableRefObject<any> = useRef();
  const { loadGoogleSDK } = useLogin(googleLoginBtn);

  useEffect(() => {
    loadGoogleSDK();
  }, []);

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <button type="button" ref={googleLoginBtn}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;

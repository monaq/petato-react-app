import { MutableRefObject } from 'react';

const useLogin = (googleLoginBtn: MutableRefObject<any>) => {
  let auth2: any;
  const prepareLoginButton = () => {
    // eslint-disable-next-line no-undef
    (auth2 as any).attachClickHandler(
      googleLoginBtn,
      {},
      (googleUser: any) => {
        const profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
      },
      (error: Error) => {
        alert(JSON.stringify(error, undefined, 2));
      },
    );
  };

  const loadScript = (src: string, id: string) => {
    return new Promise((resolve, reject) => {
      let resolved = false;
      let errored = false;
      const body = document.getElementsByTagName('body')[0];
      const tag = document.createElement('script');
      tag.type = 'text/javascript';
      tag.async = false; // Load in order

      const handleLoad = () => {
        resolved = true;
        resolve(src);
      };
      const handleReject = () => {
        errored = true;
        reject(src);
      };
      (tag as any).onreadystatechange = () => {
        if (resolved) {
          return handleLoad();
        }
        if (errored) {
          return handleReject();
        }
        const state = (tag as any).readyState;
        if (state === 'complete') {
          handleLoad();
        } else if (state === 'error') {
          handleReject();
        }
      };

      tag.addEventListener('load', handleLoad);
      tag.addEventListener('error', handleReject);
      tag.src = src;
      tag.id = id;
      body.appendChild(tag);
      return tag;
    });
  };
  const loadGoogleSDK = () => {
    // tslint:disable-next-line: no-unused-expression
    if (document.getElementById('google-jssdk')) {
      return false;
    }
    loadScript('https://apis.google.com/js/api.js', 'google-jssdk').then(() => {
      (window as any).gapi.load('auth2', () => {
        auth2 = (window as any).gapi.auth2
          .init({
            client_id:
              '428368129320-6rbrdj83tbp7ovget0ku9eknsndb6oq6.apps.googleusercontent.com',
            cookie_policy: 'single_host_origin',
            scope: 'profile email',
          })
          .then(() => {
            prepareLoginButton();
          });
      });
    });
  };

  return {
    loadGoogleSDK,
  };
};

export default useLogin;

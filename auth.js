import { AsyncStorage } from "react-native";

export const USER_KEY = "columbia";

export const onSignIn = () => {
    return new Promise((resolve, reject) => {
        try{
            AsyncStorage.setItem(USER_KEY, true)
            
            resolve(true);
        }
        catch(e){
            reject(e);
        }
    });
};

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(e => {
          reject(e);
      });
  });
};
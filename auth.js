import store from './store';

store.subscribe(listener);

function listener(){
    return new Promise((resolve, reject) => {
        const access_token = store.getState().account;

        if(access_token.info.status === 'success'){
            resolve(true);
        }
        else{
            resolve(false);
        }
    });
}

export const isSignedIn = () => listener();
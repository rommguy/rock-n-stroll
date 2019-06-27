import {app} from './my-firebase';
import {auth} from 'firebase';

export const login =  () => {
     app.auth().signInWithPopup(new auth.GoogleAuthProvider());
    return app.auth().currentUser;
}
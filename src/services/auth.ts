import { app } from './my-firebase'
import { auth } from 'firebase'
import { getCurrentUserEmail } from './db'

export const login = async () => {
    await app.auth().signInWithPopup(new auth.GoogleAuthProvider())
    return app.auth().currentUser!
}

export const currentUser = () => ({ email: getCurrentUserEmail() })

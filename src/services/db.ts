import { app } from './my-firebase';

export interface ChildData {
    name?: string;
    age: number;
    photos: Array<string>;
}

export interface UserData {
    id: string;
    name?: string;
    photos: Array<string>;
    location: Location;
    age?: number;
    children: Array<ChildData>;
}

export const setUserData = (data: UserData) => app.firestore().collection('users').doc(data.id).set(data);

export const getUserData = (userId: string) => app.firestore().collection('users').doc(userId).get();
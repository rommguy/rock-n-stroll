import { app } from './my-firebase'

export interface ChildData {
    name?: string
    age: number
}

interface GeoPoint {
    latitude: number
    longitude: number
}

export interface UserData {
    id: string
    email: string
    name?: string
    photoUrl: string
    location: GeoPoint
    age?: number
    children: ChildData[]
}

export const getUserData = async (userId: string): Promise<UserData> => {
    const userData = ((await app
        .firestore()
        .collection('users')
        .doc(userId)
        .get()) as unknown) as UserData
    return userData
}

export const getEventsData = () =>
    app
        .firestore()
        .collection('events')
        .get()

export const getCurrentUserEmail = (): string => {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('email') || ''
}

import { app } from './my-firebase'
import { firestore } from 'firebase'

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
    status: string
}

export enum MatchStatus {
    PENDING = 'pending',
    APPROVED = 'approved',
    DENIED = 'denide',
}

export interface MatchRequest {
    requestingUserEmail: string
    targetUserEmail: string
    status: MatchStatus
}

export const getUserData = async (userId: string): Promise<UserData> => {
    const userData = ((await app
        .firestore()
        .collection('users')
        .doc(userId)
        .get()) as unknown) as UserData
    return userData
}
//.onSnapshot

export const getUsersData = () =>
    app
        .firestore()
        .collection('users')
        .get()

export const getEventsData = () =>
    app
        .firestore()
        .collection('events')
        .get()

export const getLocationsData = () =>
    app
        .firestore()
        .collection('locations')
        .get()

export const getCurrentUserEmail = (): string => {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('email') || ''
}

export const createMatchRequest = (
    requestingUserEmail: string,
    targetUserEmail: string
): Promise<firestore.DocumentReference> =>
    app
        .firestore()
        .collection('matchRequests')
        .add({
            requestingUserEmail,
            targetUserEmail,
            status: MatchStatus.PENDING,
        })

export const resolveMatchRequest = async (
    requestingUserEmail: string,
    targetUserEmail: string,
    status: MatchStatus
) => {
    const results = await app
        .firestore()
        .collection('matchRequests')
        .where('requestingUserEmail', '==', requestingUserEmail)
        .where('targetUserEmail', '==', targetUserEmail)
        .get()
    if (results.docs.length) {
        const requestObj: MatchRequest = results.docs[0].data() as MatchRequest
        const updatedRequest = { ...requestObj, status }
        await app
            .firestore()
            .collection('matchRequests')
            .doc(results.docs[0].id)
            .set(updatedRequest)
    }
}

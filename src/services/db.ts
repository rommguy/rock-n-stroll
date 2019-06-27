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

export const getEventsData = () =>
    app
        .firestore()
        .collection('events')
        .get()

export const getCurrentUserEmail = (): string => {
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('email') || ''
}

export const createMatchRequest = (
    requestingUserId: string,
    targetUserId: string
): Promise<firestore.DocumentReference> => {
    const req: MatchRequest = {
        requestingUserEmail: requestingUserId,
        targetUserEmail: targetUserId,
        status: MatchStatus.PENDING,
    }
    return app
        .firestore()
        .collection('matchRequests')
        .add(req)
}

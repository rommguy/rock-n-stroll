import * as H from 'history'

export interface BaseMapItem {
    id: string
    location: [number, number]
    name: string
}
export interface Person extends BaseMapItem {
    status: string
    thumbUrl: string
    email: string
}

export interface Event extends BaseMapItem {
    name: string
    thumbUrl: string
    price: string
    address: string
    time: string
}

export interface Location extends BaseMapItem {
    name: string
    subtype: string
    thumbUrl: string
}

export type RouterHistory = H.History
export type RouterLocation = H.Location

export interface RouteProps {
    match: { params: object }
    history: RouterHistory
    location: RouterLocation
}

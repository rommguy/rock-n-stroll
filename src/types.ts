import * as H from 'history'

export interface BaseMapItem {
    id: string
    location: [number, number]
    name: string
}
export interface Person extends BaseMapItem {
    status: string
    thumbUrl: string
}

export interface Event extends BaseMapItem {
    name: string
    thumbUrl: string
}

export interface Place extends BaseMapItem {
    name: string
    thumbUrl: string
}

export type RouterHistory = H.History
export type RouterLocation = H.Location

export interface RouteProps {
    match: { params: object }
    history: RouterHistory
    location: RouterLocation
}

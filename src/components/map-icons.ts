import L from 'leaflet'
import strollerIconSvg from '../icons/stroller-icon.svg'
import eventIconSvg from '../icons/event-icon.svg'
import locationIconSvg from '../icons/garden-icon.svg'
import logoIconSvg from '../icons/logo-icon.svg'
import beachIconSvg from '../icons/beach-icon.svg'
import pharmecyIconSvg from '../icons/pharmecy-icon.svg'
import playgroundIconSvg from '../icons/playground-icon.svg'

const createIconDate = (
    data: {
        className: string
        iconUrl: string
    } & Partial<L.IconOptions>
): L.IconOptions => ({
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -19],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
    ...data,
})

export const strollerIcon = L.icon(
    createIconDate({
        className: 'strollerIcon',
        iconUrl: strollerIconSvg,
        iconSize: [54, 54],
        iconAnchor: [27, 27],
        popupAnchor: [0, -27],
    })
)

export const logoIcon = L.icon(
    createIconDate({
        className: 'logoIcon',
        iconUrl: logoIconSvg,
    })
)

export const eventIcon = L.icon(
    createIconDate({
        className: 'eventIcon',
        iconUrl: eventIconSvg,
    })
)

export const locationIcon = L.icon(
    createIconDate({
        className: 'locationIcon',
        iconUrl: locationIconSvg,
    })
)

export const beachIcon = L.icon(
    createIconDate({
        className: 'beachIcon',
        iconUrl: beachIconSvg,
    })
)

export const pharmecyIcon = L.icon(
    createIconDate({
        className: 'locationIcon',
        iconUrl: pharmecyIconSvg,
    })
)

export const playgroundIcon = L.icon(
    createIconDate({
        className: 'playgroundIcon',
        iconUrl: playgroundIconSvg,
    })
)

export const subEventsIcons: { [subtype: string]: L.Icon } = {
    beach: beachIcon,
    pharmecy: pharmecyIcon,
    playground: playgroundIcon,
}

import L from 'leaflet'
import strollerIconSvg from '../icons/stroller-icon.svg'
import eventIconSvg from '../icons/event-icon.svg'

export const strollerIcon = L.icon({
    className: 'strollerIcon',
    iconUrl: strollerIconSvg,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -19],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
})

export const eventIcon = L.icon({
    className: 'eventIcon',
    iconUrl: eventIconSvg,
    iconSize: [38, 38],
    iconAnchor: [19, 19],
    popupAnchor: [0, -19],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94],
})

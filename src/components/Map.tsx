import React, {
    FunctionComponent,
    useEffect,
    useCallback,
    useRef,
    useState,
} from 'react'
import L from 'leaflet'
import {
    eventIcon,
    locationIcon,
    strollerIcon,
    subEventsIcons,
} from './map-icons'
import { PersonDetails } from './person-details'
import { EventDetails } from './event-details'
import { LocationDetails } from './location-details'
import { Person, Event, Location, BaseMapItem } from '../types'
import roniThumb from '../roni.png'
import addMeBtnPng from '../icons/add-me-button.png'
import twoBtnsPng from '../icons/2Buttons.png'
import { getEventsData, getUsersData, getLocationsData } from '../services/db'
import css from './map.module.css'

const TEL_LOC: [number, number] = [32.0853, 34.7818]
const GAN_MEIR_LOC: [number, number] = [32.07311099895673, 34.77311253547669]

const useMapData = () => {
    const [peopleList, setUsers] = useState<Person[]>([])
    const [eventList, setEvents] = useState<Event[]>([])
    const [locationList, setLocations] = useState<Location[]>([])

    useEffect(() => {
        getEventsData().then((data: any) => {
            const events: Event[] = []
            for (const doc of data.docs) {
                const loc = doc.get('location')
                events.push({
                    id: doc.id,
                    name: doc.get('name'),
                    location: loc ? [loc.latitude, loc.longitude] : TEL_LOC,
                    thumbUrl: doc.get('thumbUrl'),
                    price: doc.get('price') || 0,
                    address: doc.get('address') || '',
                    time: doc.get('time') || '',
                })
            }
            setEvents(events)
        })
        getUsersData().then((data: any) => {
            const people: Person[] = []
            for (const doc of data.docs) {
                const loc = doc.get('location')
                people.push({
                    id: doc.id,
                    name: doc.get('name') || 'unknown',
                    status: doc.get('status') || '',
                    location: loc ? [loc.latitude, loc.longitude] : TEL_LOC,
                    thumbUrl: doc.get('photoUrl') || roniThumb,
                })
            }
            setUsers(people)
        })
        getLocationsData().then((data: any) => {
            const locations: Location[] = []
            for (const doc of data.docs) {
                const loc = doc.get('location')
                locations.push({
                    id: doc.id,
                    subtype: doc.get('subtype'),
                    name: doc.get('name'),
                    location: loc ? [loc.latitude, loc.longitude] : TEL_LOC,
                    thumbUrl: '',
                })
            }
            setLocations(locations)
        })
    }, [])
    return { eventList, peopleList, locationList }
}

export const Map: FunctionComponent<{}> = () => {
    const { eventList, peopleList, locationList } = useMapData()

    const [popupContent, setPopupContent] = useState<React.ReactNode>(null)
    const { current: popup } = useRef(L.popup({}))
    const mapRef = useRef<L.Map | null>(null)
    const selectedItemRef = useRef<L.Marker | null>(null)

    const popupWrapperRef = useRef<HTMLDivElement>(null)

    const onClick = useCallback<L.LeafletEventHandlerFn>(
        ({ target }: L.LeafletEvent) => {
            const { id, type } = target.options
            setPopupContent(
                getPopupContent(type, id, {
                    eventList,
                    peopleList,
                    locationList,
                })
            )
            const currentItem = selectedItemRef.current
            if (currentItem) {
                currentItem.unbindPopup()
            }
            selectedItemRef.current = target
            target.bindPopup(popup).openPopup()
        },
        [popup, eventList, peopleList, locationList]
    )

    useEffect(() => {
        if (mapRef.current) {
            return
        }
        const map = L.map('map', {
            center: GAN_MEIR_LOC,
            zoom: 17,
        })
        mapRef.current = map
        // popup
        popup.setContent(popupWrapperRef.current as HTMLDivElement)

        // tiles
        const accessToken = `pk.eyJ1IjoiaWRvcm9zIiwiYSI6ImNqeGVpMW16ZTBqMWozcG13YmZsc3JleG8ifQ.L0n-wINnynN_5gTr9yUYZg`
        L.tileLayer(
            `https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=${accessToken}`,
            {
                attribution:
                    // tslint:disable-next-line: max-line-length
                    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
            } as any
        ).addTo(map)
    }, [popup])

    useEffect(() => {
        const map = mapRef.current
        const markers: L.Marker[] = []
        if (map) {
            const generateMarker = (
                { id, location }: BaseMapItem,
                type: string,
                icon: L.Icon
            ) => {
                const marker = L.marker(location, {
                    icon,
                    id,
                    type,
                } as any)
                marker.addTo(map)
                marker.on('click', onClick as any)
                markers.push(marker)
            }

            locationList.map(item =>
                generateMarker(
                    item,
                    'location',
                    subEventsIcons[item.subtype] || locationIcon
                )
            )
            eventList.map(item => generateMarker(item, 'event', eventIcon))
            peopleList.map(item => generateMarker(item, 'person', strollerIcon))
        }
        return () => {
            markers.forEach(marker => marker.remove())
        }
    }, [peopleList, eventList, locationList, onClick])

    const onClickCor = (ev: any) => {
        var latlng = mapRef.current!.mouseEventToLatLng(ev.originalEvent || ev)
        console.log(latlng.lat + ', ' + latlng.lng)
    }

    return (
        <div className={css.root} onClick={onClickCor}>
            {/* <button onClick={testClick}>add</button> */}
            <div id="map" className={css.map} style={{ height: '100vh' }} />
            <div ref={popupWrapperRef}>{popupContent}</div>
            <div className={css.actionBtns}>
                <img src={twoBtnsPng} alt="twobuttons" />
                <img src={addMeBtnPng} alt="add me to map" />
            </div>
        </div>
    )
}

function getPopupContent(
    type: string,
    queryId: string,
    {
        eventList,
        peopleList,
        locationList,
    }: { eventList: Event[]; peopleList: Person[]; locationList: Location[] }
) {
    let content: React.ReactNode = null
    switch (type) {
        case 'person':
            const personData = peopleList.find(({ id }) => queryId === id)
            if (personData) {
                content = <PersonDetails data={personData} />
            }
            break
        case 'event':
            const eventData = eventList.find(({ id }) => queryId === id)
            if (eventData) {
                content = <EventDetails data={eventData} />
            }
            break
        case 'location':
            const locationData = locationList.find(({ id }) => queryId === id)
            if (locationData) {
                content = <LocationDetails data={locationData} />
            }
            break
    }
    return content
}

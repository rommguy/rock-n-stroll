import React, {
    FunctionComponent,
    useEffect,
    useCallback,
    useRef,
    useState,
} from 'react'
import L from 'leaflet'
import { strollerIcon, eventIcon } from './map-icons'
import { PersonDetails } from './person-details'
import { EventDetails } from './event-details'
import { Person, Event, BaseMapItem } from '../types'
import ronyThumb from '../roni.png'
import { getEventsData } from '../services/db'

const peopleList: Person[] = [
    {
        id: '1',
        location: [32.0853, 34.7818],
        name: 'רוני',
        status: 'ב-ping',
        thumbUrl: ronyThumb,
    },
    {
        id: '2',
        location: [32.0853, 34.7828],
        name: 'עומרי',
        status: 'מעשן פחות',
        thumbUrl: ronyThumb,
    },
    {
        id: '3',
        location: [32.0833, 34.7808],
        name: 'גיא',
        status: 'כותב קוד',
        thumbUrl: ronyThumb,
    },
]
// const eventList: Event[] = [
//     {
//         id: 'e-1',
//         location: [32.085, 34.7808],
//         name: 'חפש את המטמון לגילאי 3 ומטה',
//         thumbUrl: ronyThumb,
//     },
// ]

const useMapData = () => {
    const [eventList, setEvents] = useState<Event[]>([])

    useEffect(() => {
        getEventsData().then((data: any) => {
            const events: Event[] = []
            for (const doc of data.docs) {
                const loc = doc.get('location')
                events.push({
                    id: doc.id,
                    name: doc.get('name'),
                    location: [loc.longitude, loc.latitude],
                    thumbUrl: '',
                })
            }
            setEvents(events)
        })
    }, [])
    return { eventList }
}

export const Map: FunctionComponent<{}> = () => {
    const { eventList } = useMapData()

    const [popupContent, setPopupContent] = useState<React.ReactNode>(null)
    const { current: popup } = useRef(L.popup({}))
    const mapRef = useRef<L.Map | null>(null)
    const selectedItemRef = useRef<L.Marker | null>(null)

    const popupWrapperRef = useRef<HTMLDivElement>(null)

    const onClick = useCallback<L.LeafletEventHandlerFn>(
        ({ target }: L.LeafletEvent) => {
            const { id, type } = target.options
            setPopupContent(getPopupContent(type, id, { eventList }))
            const currentItem = selectedItemRef.current
            if (currentItem) {
                currentItem.unbindPopup()
            }
            selectedItemRef.current = target
            target.bindPopup(popup).openPopup()
        },
        [popup, eventList, peopleList]
    )

    useEffect(() => {
        if (mapRef.current) {
            return
        }
        const map = L.map('map', {
            center: [32.0853, 34.7818],
            zoom: 13,
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
        console.log('render map with ', eventList, peopleList)
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
            peopleList.map(item => generateMarker(item, 'person', strollerIcon))
            eventList.map(item => generateMarker(item, 'event', eventIcon))
        }
        return () => {
            markers.forEach(marker => marker.remove())
        }
    }, [mapRef.current, peopleList, eventList])

    return (
        <div>
            <div id="map" style={{ height: '100vh' }} />
            <div ref={popupWrapperRef}>{popupContent}</div>
        </div>
    )
}

function getPopupContent(
    type: string,
    queryId: string,
    { eventList }: { eventList: Event[] }
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
    }
    return content
}

import React, {
    FunctionComponent,
    useEffect,
    useCallback,
    useRef,
    useState,
} from 'react'
import L from 'leaflet'
import { strollerIcon } from './map-icons'
import { PersonDetails } from './person-details'
import { Person } from '../types'
import ronyThumb from '../roni.png'

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
        status: 'מעשן',
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

export const Map: FunctionComponent<{}> = () => {
    const [popupContent, setPopupContent] = useState<React.ReactNode>(null)
    const { current: popup } = useRef(L.popup({}))
    const selectedItemRef = useRef<L.Marker | null>(null)

    useEffect(() => {
        const map = L.map('map', {
            center: [32.0853, 34.7818],
            zoom: 13,
        })
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

        // markers
        for (const person of peopleList) {
            const marker = L.marker(person.location, {
                icon: strollerIcon,
                id: person.id,
                type: 'person',
            } as any)
            marker.addTo(map)
            marker.on('click', onClick as any)
        }
    }, [])

    const onClick = useCallback<L.LeafletEventHandlerFn>(
        ({ target }: L.LeafletEvent) => {
            const { id, type } = target.options
            setPopupContent(getPopupContent(type, id))
            const currentItem = selectedItemRef.current
            if (currentItem) {
                currentItem.unbindPopup()
            }
            selectedItemRef.current = target
            target.bindPopup(popup).openPopup()
        },
        []
    )

    const popupWrapperRef = useRef<HTMLDivElement>(null)

    return (
        <div>
            <div id="map" style={{ height: '100vh' }} />
            <div ref={popupWrapperRef}>{popupContent}</div>
        </div>
    )
}

function getPopupContent(type: string, queryId: string) {
    switch (type) {
        case 'person':
            const personData = peopleList.find(({ id }) => queryId === id)
            return personData ? <PersonDetails data={personData} /> : null
            break
    }
    return null
}

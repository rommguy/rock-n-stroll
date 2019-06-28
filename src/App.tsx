import React, { FunctionComponent, useEffect, useState } from 'react'
import { Map } from './components/Map'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { Intro } from './components/Intro'
import { firestore } from 'firebase'
import Button from '@material-ui/core/Button'
import {
    MatchRequest,
    MatchStatus,
    UserData,
    getCurrentUserEmail,
    getUserDataFromEmail,
    registerMatchChange,
    resolveMatchRequest,
} from './services/db'
import './App.scss'

const noop = () => undefined
let initialSnapshot = false

interface InteractionContent {
    text: string
    fromUser: UserData | null
    onClick: () => void
    showApproveButton: boolean
}

const initialInteractionContent: InteractionContent = {
    text: '',
    fromUser: null,
    onClick: noop,
    showApproveButton: false,
}

export const App: FunctionComponent<{}> = () => {
    const [interactionContent, setInteractionContent] = useState<
        InteractionContent
    >(initialInteractionContent)
    const [showPopup, setShowPopup] = useState<boolean>(false)

    useEffect(() => {
        const currentUserEmail = getCurrentUserEmail()
        registerMatchChange((snapshot: firestore.QuerySnapshot) => {
            if (!initialSnapshot) {
                initialSnapshot = true
                return
            }
            const request = snapshot.docChanges()[0].doc.data() as MatchRequest

            const updateInteractionRequestToCurrentUser = async () => {
                const requestingUser = await getUserDataFromEmail(
                    request.requestingUserEmail
                )
                if (requestingUser) {
                    setInteractionContent({
                        text: `${requestingUser.name} רוצה להצטרף!`,
                        fromUser: requestingUser,
                        onClick: () =>
                            resolveMatchRequest(
                                request.requestingUserEmail,
                                request.targetUserEmail,
                                MatchStatus.APPROVED
                            ),
                        showApproveButton: true,
                    })
                }
            }
            const updateInteractionRequestFromCurrentUser = async () => {
                const targetUser = await getUserDataFromEmail(
                    request.targetUserEmail
                )
                if (targetUser) {
                    setInteractionContent({
                        text: `${targetUser.name} רוצה להיפגש!`,
                        fromUser: targetUser,
                        onClick: noop,
                        showApproveButton: false,
                    })
                }
            }

            if (
                request.targetUserEmail === currentUserEmail &&
                request.status === MatchStatus.PENDING
            ) {
                updateInteractionRequestToCurrentUser()
            } else if (
                request.requestingUserEmail === currentUserEmail &&
                request.status === MatchStatus.APPROVED
            ) {
                updateInteractionRequestFromCurrentUser()
            }
        })
    }, [])

    useEffect(() => {
        if (interactionContent.text) {
            setShowPopup(true)
        } else {
            setShowPopup(false)
        }
    }, [interactionContent])

    return (
        <Router>
            <div className="App">
                <Route path="/map" component={Map} />
                <Route path="/" component={Intro} />
                <div
                    className={`interaction-popup ${
                        showPopup ? 'visible' : 'hidden'
                    }`}
                >
                    <div className="popup-text">{interactionContent.text}</div>
                    <div className="actions-area">
                        {interactionContent.showApproveButton && (
                            <span>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        interactionContent.onClick()
                                        setShowPopup(false)
                                    }}
                                >
                                    יאללה, בכיף
                                </Button>
                                <Button variant="contained" color="primary">
                                    צפה בפרופיל
                                </Button>{' '}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Router>
    )
}

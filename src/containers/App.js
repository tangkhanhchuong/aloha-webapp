import React, {useEffect} from 'react'
import { connect } from 'react-redux'

import { authCheckState } from 'store/auth/auth_actions'
import { connectSocket } from 'store/messages/messages_actions'

import AuthContainer from "./AuthContainer"
import RouterContainer from "./RouterContainer"

const App = (props) => {
    const { isAuthenticated, authInfo } = props

    useEffect(() => {
        props.onTryAutoSignIn()
    }, [])

    useEffect(() => {
        const accessToken = authInfo.token
        props.onTryToConnectSocket(accessToken)

    }, [authInfo])

    return (
        <>
          {isAuthenticated ? <RouterContainer /> : <AuthContainer />}
        </>
    )
}

const mapStateToProps = state => {
    return {
        authInfo: state.auth,
        isAuthenticated: !!state.auth.token,
        // notiMessage: state.system.notiMessage,
        // redirect: state.system.redirect,
        // hasLoadedAllConversations: state.message.hasInitSuccessfully || false,
        // theme_background: state.system.theme_background,
        // theme_fontColor: state.system.theme_fontColor,
        // theme_fontSize: state.system.theme_fontSize,
        // device: state.system.device
    }
}


const mapDispatchToProps = dispatch => {
    return {
        // onTrySyncThemeConfigs: async () => dispatch(systemActions.syncThemeConfigsFromLocalStorage()),
        onTryAutoSignIn: async () => await dispatch(authCheckState()),
        onTryToConnectSocket: async (token) => await dispatch(connectSocket(token)),
        // onTryToDeleteSocket: async () => await dispatch(messageActions.deleteSocket()),
        // addMessagesToConversation: async (conversation_id, messages) => await dispatch(messageActions.addMessagesToConversation(conversation_id, messages)),
        // getAllStickerCollections: async () => await dispatch(messageActions.getAllStickerCollections()),
        // setDevice: async (pDevice) => await dispatch(systemActions.setDevice(pDevice)),
        // setRedirect: async (pPath) => await dispatch(systemActions.setRedirect(pPath)),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App)

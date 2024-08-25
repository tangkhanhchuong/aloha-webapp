import React from 'react'
import { connect } from 'react-redux'

import { CustomInput } from 'components/Input'
import { socket } from 'store/messages/messages_actions'

const ChatBar = (props) => {
    const { setMessages, authInfo } = props

    const onSendMsg = (e) => {
        e.preventDefault()
        const val = e.target.elements[0].value
        if(!val || val === "")    return

        const newMsg = {
            content: val, 
            sender: {
                _id: authInfo.userId,
                username: authInfo.username
            }
        }
        
        setMessages((messages => ([ ...messages, newMsg ])))

        const { _id, username} = JSON.parse(localStorage.getItem('authInfo'))

        if(socket) socket.emit("send_msg", {
            msg: newMsg,
            sender: { _id, username }
        })
        e.target.elements[0].value = ""
    }

    return (
        <form onSubmit={onSendMsg}>
            <CustomInput for="msg" mb="1rem" width="100%" padding="0.4rem 1.0rem" color="#e5e5e5" textColor="#5d5d5d"/>
        </form>
    )
}

const mapStateToProps = state => {
    return {
        authInfo: state.auth
    }
}

export default connect(mapStateToProps)(ChatBar)
import React, { useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { Spinner } from 'react-bootstrap'

import Header from 'components/Header'
import chatRequests from 'http/chat_requests'

import ChatBar from './ChatBar'
import Messages from './Messages'

const ConversationContainer = styled.div`
    border: 1px solid lightgray; 
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin-right: 10%
`

const ConversationBody = ({ initMessages }) => {
    const [messages, setMessages] = useState(initMessages)

    return (
        <>
            <Messages messages={messages} />
            <ChatBar setMessages={setMessages} />   
        </>
    )
}

const Conversation = () => {
    const chatId = useParams().id
    const { data } = useQuery('get_messages_in_chat', chatRequests.getMessages.bind(this, chatId))
    
    return (
        <ConversationContainer>
            <Header>
                { chatId ?? "Conversation" }
            </Header>
            {
                data ? <ConversationBody initMessages={data.data}/> : <Spinner />
            }
        </ConversationContainer>
    )
}

export default Conversation

import React from 'react'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { FaPlus } from 'react-icons/fa'

import Avatar from "styles/Avatar"
import Header from 'components/Header'
import chatRequests from 'http/chat_requests'

const StyledChatListContainer = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column
`

const StyledChatContainer = styled.div`
    border-bottom: 1px solid #CA2055;
    padding: 10px 20px;
    cursor: pointer;
    &:hover {
        background-color: ${(props) => props.theme.hover};
    }
`

const StyledAvatarContainer = styled.div`
	display: flex;
    flex-direction: row;
	justify-content: flex-start;

	img {
		margin-top: 8px;
	}
	b {
		margin-top: 15px;
	}
`

const StyledNameAndLatedMsg = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: -10px;
    padding-top: -2px;
    flex: 1
`

const StyledLastMsg = styled.p`
    font-size: 14px;
    color: gray
`

const StyledNewMsgBtn = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    color: ${(props) => props.theme.accentColor};
    background-color: #fff;


    &: hover {
        background-color: ${(props) => props.theme.hover};

    }
`

const Chat = ({ chat }) => {
    const { isGroupChat, _id } = chat

    const MAX_LEN_LAST_MSG = 30

    const generateLastMsg = (msg) => {
        return msg.length < MAX_LEN_LAST_MSG ? msg : msg.slice(0, MAX_LEN_LAST_MSG) + " ..."
    }

    return (
        <StyledChatContainer>
            <Link to={`/messages/${_id}`}>        
                <StyledAvatarContainer>
                    <Avatar size="50px" src={`https://th.bing.com/th/id/Rc7b5f6a007a193933d22f1b03bf2b43e?rik=O%2fB5mKeF2WBZyg&pid=ImgRaw`} alt="avatar" />
                    <StyledNameAndLatedMsg>
                        <b>{_id}</b>
                        <StyledLastMsg>{generateLastMsg(isGroupChat.toString())}</StyledLastMsg>
                    </StyledNameAndLatedMsg>
                </StyledAvatarContainer>
            </Link>
        </StyledChatContainer>
    )   
}

const ChatList = () => {
    const { data, isLoading } = useQuery('get_chats', chatRequests.list)

    if(isLoading)   return <></>

    const chatList = data.data

    return chatList.map(chat => <Chat chat={chat} key={chat._id}/>  )    
}

const SideBar = () => {
    return (
        <StyledChatListContainer>
            <Header justify="space-between">
                <b>Messages</b>
                <StyledNewMsgBtn onClick={() => alert("Hello")}>
                    <FaPlus />
                </StyledNewMsgBtn>
            </Header>
            <ChatList />
        </StyledChatListContainer>
    )
}

export default SideBar

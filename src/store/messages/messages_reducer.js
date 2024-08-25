import { SocketStatus } from './messages_actions'

const initialState = {
    allConversations: {},
    socket: null,
    initialized: false,
    sticker_collections: [],
    // numOfNoti: 0
}


// const increaseNumOfNoti = ( state, action ) => {
//     return updateObject( state, { numOfNoti: state.numOfNoti + action.num } )
// }

const deleteSocket = (state) => {
    return { ...state, socket: null }
} 

const setSocket = (state, action) => {
    return { ...state, socket: action.socket }
} 

// const addCollectionsToStickerCollections = ( state, action ) => {
//     return updateObject( state, {
//         //sticker_collections: [...state.sticker_collections, ...action.collections]
//         sticker_collections: [...action.collections]
//     })
// }

const setAllConversations = (state, action) => {
    return { 
        ...state,  
        allConversations: action.conversations, 
        initialized: true 
    }
}

// const changeConversationInformation = ( state, action ) => {
//     let cloneAllConversations = updateObject(state.allConversations)
//     cloneAllConversations[action.conversation_id] = updateObject(cloneAllConversations[action.conversation_id], {
//         info: updateObject(cloneAllConversations[action.conversation_id]?.info, action.newChanges)
//     })

//     return updateObject( state, {
//         allConversations: cloneAllConversations,
//     })
// }

const addMessagesToConversation = (state, action) => {
    const newMsg = action.msg
    const { messages } = state

    return { ...state, messages: [ ...messages, newMsg ]  }
}

// const changeStatusMessage = ( state, action ) => {
//     let cloneAllConversations = updateObject(state.allConversations)
//     const newMessage = updateObject(cloneAllConversations[action.conversation_id].messages[action._id], action.newChanges)
    
//     const cloneMessages = updateObject(cloneAllConversations[action.conversation_id].messages, {
//         [newMessage._id]: newMessage
//     })
//     if (newMessage._id !== action._id) {
//         delete cloneMessages[action._id]
//     }

//     cloneAllConversations[action.conversation_id] = updateObject(cloneAllConversations[action.conversation_id], {
//         messages: cloneMessages
//     })

//     return updateObject( state, {
//         allConversations: cloneAllConversations,
//     })
    
// }


// const changeOneConversation = ( state, action ) => {
//     let cloneAllConversations = {...state.allConversations}
//     cloneAllConversations[action.conversation_id] = updateObject(cloneAllConversations[action.conversation_id], action.payload)
//     return updateObject( state, {
//         allConversations: cloneAllConversations,
//         initialized: true
//     })
// }

// const resetToInitialState = ( state, action ) => {
//     return initialState
// }

const reducer = (state = initialState, action) => {
    console.log(action.type)
    switch (action.type) {
        case SocketStatus.SET_SOCKET: 
            return setSocket(state, action)
        case SocketStatus.SET_ALL_CONVERSATIONS: 
            return setAllConversations(state, action)
        case SocketStatus.DELETE_SOCKET:
            return deleteSocket(state, action)
        case SocketStatus.SEND_MSG: 
        case SocketStatus.RECEIVE_MSG:
            return addMessagesToConversation(state, action)
        default:
            return state
    }
}

export default reducer
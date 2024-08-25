// export const SET_ALL_CONVERSATIONS = 'SET_ALL_CONVERSATIONS';
// export const CHANGE_ONE_CONVERSATION = 'CHANGE_ONE_CONVERSATION';
// export const ADD_COLLECTIONS_TO_STICKERCOLLECTIONS = 'ADD_COLLECTIONS_TO_STICKERCOLLECTIONS';
// export const SET_SOCKET = 'SET_SOCKET';
// export const DELETE_SOCKET = 'DELETE_SOCKET';

// export const ADD_MESSAGES_TO_CONVERSATION = 'ADD_MESSAGES_TO_CONVERSATION';
// export const CHANGE_STATUS_MESSAGE = 'CHANGE_STATUS_MESSAGE';
// export const CHANGE_CONVERSATION_INFOMATION = 'CHANGE_CONVERSATION_INFOMATION';
// export const INCREASE_NUM_OF_NOTI = 'INCREASE_NUM_OF_NOTI';
// export const RESET_TO_INITIAL_STATE = 'RESET_TO_INITIAL_STATE';


// export const MESSAGE_STATUS = {
//     PENDING: 1,
//     SENT: 2,
//     RECEIVED: 3,
//     FAILED: 4
// }

// export const MESSAGE_TYPE = {
//     STRING_MESSAGE: 1,
//     STICKER_MESSAGE: 2
// }

// import * as actionTypes from './constants';
// import axios from 'axios';
// import SYSTEM_URL from "system";
// import io from "socket.io-client";

// export const setAllConversation = (arrayOfConversations) => {
//     let result = {};
//     arrayOfConversations.forEach((conv, index) => {
        
//         result[conv._id] = conv;
//     });
//     return {
//         type: actionTypes.SET_ALL_CONVERSATIONS,
//         payload: result
//     };
// };

// export const changeOneConversation = (id, updatedFields) => {
//     return {
//         type: actionTypes.CHANGE_ONE_CONVERSATION,
//         conversation_id: id,
//         payload: updatedFields,
//     };
// };

// const addCollectionsToStickerCollections = (pCollections) => {
//     return {
//         type: actionTypes.ADD_COLLECTIONS_TO_STICKERCOLLECTIONS,
//         collections: pCollections
//     };
// };


// export const getAllStickerCollections = () => {
//     return dispatch => {
//         axios.get(SYSTEM_URL.BASE_URL + SYSTEM_URL.ROUTES.sticker_collections.getAll)
//             .then(res => {
//                 if(Array.isArray(res.data.data))
//                     dispatch(addCollectionsToStickerCollections(res.data.data));
//             })
//             .catch(e => console.log(e));
//     };
// };

// const setSocket = (pSocket) => {
//     return {
//         type: actionTypes.SET_SOCKET,
//         socket: pSocket
//     };
// }

// export const deleteSocket = () => {
//     return {
//         type: actionTypes.DELETE_SOCKET
//     };
// }

// export const changeConversationInformation = (pConvId, pNewChanges) => {
//     return {
//         type: actionTypes.CHANGE_CONVERSATION_INFOMATION,
//         newChanges: pNewChanges,
//         conversation_id: pConvId
//     };
// }

// export const addMessagesToConversation = (pConversation_id, pMessages) => {
//     return {
//         type: actionTypes.ADD_MESSAGES_TO_CONVERSATION,
//         conversation_id: pConversation_id,
//         messages: pMessages,
        
//     }
// }

// const changeStatusMessage = (pConversation_id, pOldMessageId, pNewChanges) => {
//     return {
//         type: actionTypes.CHANGE_STATUS_MESSAGE,
//         conversation_id: pConversation_id,
//         _id: pOldMessageId,
//         newChanges: pNewChanges
//     }
// }

// const increaseNumOfNoti = (pNum=1) => {
//     return {
//         type: actionTypes.INCREASE_NUM_OF_NOTI,
//         num: pNum
//     };
// }

// export const resetToInitialState = (pNum=1) => {
//     return {
//         type: actionTypes.RESET_TO_INITIAL_STATE,
//     };
// }
import { io } from 'socket.io-client' 

let socket

export { socket }

export const SocketStatus = {
    SEND_MSG: "SEND_MSG", 
    SET_ALL_CONVERSATIONS: "SET_ALL_CONVERSATIONS",
    DELETE_SOCKET: "DELETE_SOCKET",
    SET_SOCKET: "SET_SOCKET",
    RECEIVE_MSG: "RECEIVE_MSG"
}

const initSocket = (socket) => {
    return { type: SocketStatus.SET_SOCKET, socket: socket }
}

export const deleteSocket = () => {
    return { type: SocketStatus.DELETE_SOCKET }
}

const receiveMsg = ({ msg }) => {
    return { type: SocketStatus.RECEIVE_MSG, msg }
}

export const connectSocket = (userToken) => {
    return dispatch => {
        if (userToken) {
            socket = io(process.env.REACT_APP_SYSTEM_URL, { transport: ['websocket'] })
            // dispatch(initSocket(socket))

            socket.on("disconnect", () => {
                dispatch(deleteSocket())
            })
        
            socket.on("user_connected", (payload) => {
                
            })

            socket.on("receive_msg", (payload) => {
                dispatch(receiveMsg({ msg: payload.content }))
            })

            // dispatch(initSocket(socket));
            
            // newSocket.on('Server_NewMessages', (data) => {
            //     console.log("Server_NewMessages", data);
            //     dispatch(increaseNumOfNoti(data.messages?.length));
            //     dispatch(addMessagesToConversation(data.conversation_id, data.messages));
            // })

            // newSocket.on('Server_ChangeStatusMessage', (data) => {
            //     console.log("Server_ChangeStatusMessage", data);
            //     dispatch(changeStatusMessage(data.conversation_id, data._id, data.newChanges))
            // })

            // newSocket.on('Server_AllConversation', (data) => {
            //     console.log("Server_AllConversation", data);
            //     data.forEach(e => {
            //         dispatch(addMessagesToConversation(e._id, [e.last_message]));
            //     });
            // });

            // newSocket.on('Server_Conversations_UserProfiles', (data) => {
            //     console.log("Server_Conversations_UserProfiles", data);
            //     data.forEach(e => {
            //         dispatch(changeConversationInformation(e._id, {
            //             user_profiles: e.user_profiles
            //         }));
            //     });
            // });
        
            // dispatch(setSocket(newSocket));
        }
    }
}
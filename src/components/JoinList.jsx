import '../componentsCssFile/JoinList.css';
import instance from '../api/axios';
import { useEffect, useState } from 'react';
export default function JoinList ({name, authId, roomId, joinUserId}) {

    const [participantID, setParticipantId] = useState('');
    const confirmJoin = async () => {
        try {
            const response = await instance.patch('/participants', {user_id: joinUserId, room_id: roomId},
            {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`}});
             setParticipantId(response.data.participant_id);
             alert('참가 요청이 수락되었습니다!');
             window.location.reload();
        }
        catch(error){
            if (error.response.status === 403){
                alert('방장이 아닙니다!');
            }
            else if (error.response.status === 409){
                alert('인원이 초과되었습니다!');
            }
        }
    }
    
    const confirmJoin2 = async () => {
        if (participantID === ''){
            return;
        }
        try{
            await instance.post('plans', {participant_id: participantID},
            {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`}});
         }
         catch(error){
            console.log("계획 공간 생성 실패!");
        }
    }

    const rejectJoin = async () => {
        try {
            await instance.post('participants/reject', {user_id: joinUserId, room_id: roomId},
            {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`}});
            window.location.reload();
        }
        catch(error){
            console.log('reject error!');
            if(error.status === 403){
                alert('방장이 아닙니다!');
            }
            else if(error.status === 404){
                alert('해당되는 요청자가 없습니다!');
            }
        }
    }
    useEffect(() => {confirmJoin2();}, [participantID]);
    
    return (
        <div className='joincontainer'>
            <h2>{name}, {authId} 님이 방 참가 요청을 보냈습니다.</h2>
            <button className='joinfor' onClick={confirmJoin}>수락</button>
            <button className='joinfor' onClick={rejectJoin}>거절</button>
        </div>
    );
}
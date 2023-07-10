import { useLocation } from "react-router-dom";
import instance from "../api/axios";
import { useEffect, useState } from "react";
import './AboutRoomPage.css';
import Participants from "../components/Participants";

export default function AboutRoomPage () {
    const location = useLocation();
    const [roomInfor, setRoomInfor] = useState({});
    const [participantsInfo, setParticipantsInfo] = useState([]);

    //console.log("hello");
    console.log(location);
    const roomId = location.state.roomId;
    const getInfo = async (roomId) => {
        try {
        const response = await instance.get(`/rooms/${roomId}`, 
        {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
        console.log("서버 응답: ", response);
        await setRoomInfor(response.data);
        console.log("방 정보: ", roomInfor);
        }
        catch(errer) {
            console.log("error!");
        }

    }

    const getParticipantInfo = async () => {
        try {
            const response = await instance.get(`/participants/${roomId}?accepted=${true}`,
            {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
            console.log(response);
            const _participantsInfo = await response.data.map((item) => ({
                participantId: item.participant_id,
                userId: item.user_id,
                authId: item.auth_id,
                userName: item.username,
                email: item.email,
                profile: item.profile,
                authority: item.authority
               })
            );
            await setParticipantsInfo(participantsInfo.concat(_participantsInfo));
            console.log("유저 정보:", participantsInfo);
        
        }
        catch(error){
            console.log("get participants error!");
        }
    }
    useEffect(() => {getInfo(roomId)}, []);
    useEffect(() => {getParticipantInfo()}, []);

    return (    
        <div className="mine">
            <h1 className="roomTitle">{roomInfor.title}</h1>
            <div className="sp"><h3><span className="sp1">전체 주차 : {roomInfor.week} </span> <span className="sp2">현재 주차 : {roomInfor.current_week}</span></h3></div>
            <div className="party">
                <h3>참가자</h3>
                <div>{participantsInfo.map((item) => (<Participants key={item.userId} authId={item.authId} email={item.email} userName={item.userName}/>))}</div>
            </div>
        </div>
    )
}
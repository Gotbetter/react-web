import { useLocation } from "react-router-dom";
import instance from "../api/axios";
import { useEffect, useState } from "react";
import './AboutRoomPage.css';

export default function AboutRoomPage () {
    const location = useLocation();
    const [roomInfor, setRoomInfor] = useState({});
    console.log("hello");
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
    useEffect(() => {getInfo(roomId)}, []);

    return (    
        <div className="mine">
            <h1 className="roomTitle">{roomInfor.title}</h1>
            <div className="sp"><h3><span className="sp1">전체 주차 : {roomInfor.week} </span> <span className="sp2">현재 주차 : {roomInfor.current_week}</span></h3></div>
            <div className="party"><h3>참가자</h3></div>
        </div>
    )
}
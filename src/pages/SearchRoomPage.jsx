import React, {useState} from "react";
import instance from "../api/axios";
import './SearchRoomPage.css';

export default function SearchRoompage () {
   
    const [roomCode, setRoomCode] = useState('');
    const join = async () => {
        try{
            const response = await instance.post('/participants', {
                room_code: roomCode,}, {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
            console.log(response.data);
            alert("참가 요청이 성공적으로 전송되었습니다!");
            
        } catch(error){
            
            console.log("error!");
            console.log(error);
            console.log(error.response.data.errors[0].errorMessage);
            if (roomCode === "")
                alert("방 입장 코드를 입력해 주세요!");
            else if (error.response.data.errors[0].errorMessage === "Already exists data.")
                alert("이미 승인 요청 중인 방입니다!")
            else if (error.response.data.errors[0].errorMessage === "Already in the room.")
                alert("이미 참여한 방입니다!");
            else if (error.response.data.errors[0].errorMessage === "Already full.")
                alert("이미 인원이 모두 찬 방입니다!")
            else 
                alert("방 입장 코드를 다시 한번 확인해 주세요!");
        }
    }
    return (
        <div className="container2">
            <h1 className="title2">GOT BETTER</h1>
            <input onChange={(e) => setRoomCode(e.target.value)} placeholder="참여 코드"></input>
            <div>
                <button className="join" onClick={join}>참여하기</button>
            </div>
        </div>
    );
}
import instance from "../api/axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import JoinList from "../components/JoinList";
import '../pagesCssFile/JoinPage.css';
export default function JoinPage () {
    
    const location = useLocation();
    const userId = location.state.userId;
    const roomId = location.state.roomId;
    const [joinList, setJoinList] = useState([]);
   
    const getList = async () => {
        try {
            const response = await instance.get(`/participants/${roomId}?accepted=${false}`, // 방 참가 승인 대기 중인 목록 불러오기
            {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
            setJoinList(response.data);
            if (response.data.length === 0){
                alert('승인 대기 중인 요청이 없습니다!');
            }
        }
        catch(error){
            if(error.response.status === 403){
                alert('방장이 아닙니다!');
            }
        }
    }
    
    useEffect(() => {getList();}, []);
    return(
        <div className="mine">
            <h1>요청 수락하기</h1>
            {joinList.map((item) => (<JoinList key={item.user_id} joinUserId={item.user_id} name={item.username} authId={item.auth_id} userId={userId} roomId={roomId}/>))}
        </div>
    );
}
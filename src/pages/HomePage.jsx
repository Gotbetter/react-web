import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";
import Rooms from "../components/Rooms";
import {FaSearchPlus} from "react-icons/fa";
import {FaPlus} from "react-icons/fa";

export default function HomePage () {
    
    const movePage = useNavigate();
    const [roomInfor, setRoomInfor] = useState([]);
    
    const backTologin = () => {
        movePage('/');
    }

    const moveToSearchRoom = () => {
        movePage('/searchRoom');
    }

    const moveToCreateRoom = () => {
        movePage('/createRoom');
    }

    const logout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        alert ("로그아웃 되었습니다. 로그인 화면으로 이동합니다.");
        backTologin();
    }

   async function getInfo() {
        try {
            const response = await instance.get('/rooms',{headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              }, // 요청에 Header 추가
            });

            console.log('room information : ',response.data);
             const _roomInfor = await response.data.map((item) => ({
                room_id: item.room_id,
                room_title: item.title,
                max_user_num: item.max_user_num,
                current_user_num: item.current_user_num,
                current_week: item.current_week,
                week: item.week,
                total_entry_fee: item.total_entry_fee
               })
            )
            await setRoomInfor(roomInfor.concat(_roomInfor));
        }
        catch(error){
            console.log(error);
            alert('방 정보를 가져오지 못했습니다.');
        }
    }
    useEffect(() => {getInfo();}, []); // 방 정보 한번만 가져오도록 
    console.log("confirm : ", roomInfor);

    return (
        <div>
            <button className = "menu" onClick = {logout}>Logout</button>
            <h1 className="title">Study Room</h1>
            <div>{roomInfor.map((item) => (<Rooms key = {item.room_id} id = {item.room_id} title = {item.room_title} currentWeek = {item.current_week}
            week = {item.week} entryFee = {item.total_entry_fee} maxUserNum = {item.max_user_num} currentUserNum = {item.current_user_num}/> ))}</div>
            <div className="plus"><span className="plus1" onClick={moveToCreateRoom}><FaPlus size="30px"/></span><span className="plus2" onClick={moveToSearchRoom}><FaSearchPlus size="30px"/></span></div>
        </div>
    );

}
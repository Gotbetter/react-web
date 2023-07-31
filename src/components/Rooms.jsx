import React from 'react'
import '../componentsCssFile/Rooms.css'
import { useNavigate } from 'react-router-dom';
function Rooms({id, title, currentWeek, week, maxUserNum, currentUserNum, entryFee}) {
    const movePage = useNavigate();
    const moveToAboutRoomPage = () => {
        movePage('/aboutRoom', {state: {roomId: id}});
    }
    return (
        <div>
            <div onClick={moveToAboutRoomPage} className='roomInformation'>
                <h1>{title}<span className='userNum'>{currentUserNum}/{maxUserNum}</span></h1>
                <div className='detail'>
                    <span>#{week}주짜리 방</span>
                    <span>#{currentWeek}주차</span>
                    <span>#입장료 {entryFee}원</span>
                </div>
            </div>
        </div>
    )
}
export default Rooms
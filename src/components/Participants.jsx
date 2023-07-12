import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Participants.css';

export default function Participants ({authId, email, userName, planId, week, participantId}) {
    const moveToPage = useNavigate();
    const moveToDetailPlan = () => {
        moveToPage('/detailPlan', {state: {planId: planId, week: week, participantId: participantId, userName: userName}});
    }
    //useEffect(() => {moveToDetailPlan();}, []);
    return (
        <div onClick={moveToDetailPlan} className='participants'>
            <h2>{userName}</h2>
        </div>
    );
}
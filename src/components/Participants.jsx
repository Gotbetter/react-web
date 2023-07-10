import React from 'react';
import './Participants.css';

export default function Participants ({authId, email, userName}) {

    return (
        <div className='participants'>
            <h2>{userName}</h2>
        </div>
    );
}
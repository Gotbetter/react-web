import { useNavigate } from 'react-router-dom';
import '../componentsCssFile/Participants.css';

export default function Participants ({userName, planId, week, participantId}) {
    
    const moveToPage = useNavigate();
    const moveToDetailPlan = () => {
        moveToPage('/detailPlan', {state: {planId: planId, week: week, participantId: participantId, userName: userName}});
    }
  
    return (
        <div onClick={moveToDetailPlan} className='participants'>
            <h2>{userName}</h2>
        </div>
    );
}
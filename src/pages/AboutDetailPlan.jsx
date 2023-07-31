import { useLocation } from 'react-router-dom'
import '../pagesCssFile/AboutDetailPlan.css';
import DetailPlan from '../components/DetailPlan';

export default function AboutDetailPlan () {
    const location = useLocation();
    const week = location.state.week;
    const participantId = location.state.participantId;
    const userName = location.state.userName;

    const createArray = (week) => {
        let arr = [];
        for (let i=1; i<=week; i++){
            arr.push(i);
        }
        return arr;
    }

    const componentArray = createArray(week);

    console.log('array', componentArray);
    return (
        <div>
            <div className='who'><h1>{userName}님의 계획</h1></div>
            <div className='planss'>{componentArray.map((item) => (<DetailPlan key={item} week={item} participantId={participantId}/>))}</div>
        </div>
    );
}
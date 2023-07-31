import '../componentsCssFile/Ranking.css';
import { useEffect, useState } from 'react';
import instance from '../api/axios';

export default function Ranking ({roomId}) {
    const [rankingData, setRankingData] = useState([]);
    const getRanking = async () => {
        try{
            const response = await instance.get(`/rooms/${roomId}/rank`,
            {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
            setRankingData(response.data);
        }
        catch(error){
            console.log('get ranking error');
        }
   }
   useEffect(() => {getRanking();}, []);
   
    return (
        <div id="a">
            {rankingData.map((item) => (<div key={item.rank_id}><h1><span className='left'>{item.rank}등</span><span className='mid'>{item.username}</span><span className='right'>{item.refund}원</span></h1></div>))}
        </div>
    );
}
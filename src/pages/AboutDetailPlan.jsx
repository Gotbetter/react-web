import { useLocation } from 'react-router-dom'
import instance from '../api/axios';
import { useState, useEffect } from 'react';
import DetailPlan from '../components/DetailPlan';

export default function AboutDetailPlan () {
    const location = useLocation();
    const week = location.state.week;
    const planId = location.state.planId;
    const participantId = location.state.participantId;
    const userName = location.state.userName;
    const [detailPlanData, setDetailPlanData] = useState([{content: '메롱하기', complete: true}, {content: '밥먹기', complete: true}]);
    console.log(week, planId, participantId);

    const planIdList = [];

    const getDetailPlan = async () => {
        for (let i = 1; i <= week; i++){
            try{
                console.log(participantId);
                const response = await instance.get(`/plans/${participantId}?week=${i}`,
                {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
                console.log(response.data.plan_id);
                planIdList.push(response.data.plan_id);
                console.log('배열', planIdList);
                await getDetailPlan2();
            }
            catch(error){
                console.log('error!');
            }
        }
    }

    const getDetailPlan2 = async () => {
        console.log()
        if(planIdList.length < week){
            return;
        }
        else {
                console.log(planIdList.length);
                for(let i = 0; i <= planIdList.length-1; i++){
                    try{
                        const response = await instance.get(`/plans/${planIdList[i]}/details`,
                        {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
                        console.log('세부계획 조회 결과', response);
                        const _detailPlanData = response.data;
                        setDetailPlanData(detailPlanData.concat(_detailPlanData));
                    }
                     catch(error){
                    console.log('error!');
                    }
                }
            }
        } 

    useEffect(() => {getDetailPlan();}, []);
    
    return (
        <div>
            <div className='who'><h1>{userName}님의 계획</h1></div>
            <div className='planss'>{detailPlanData.map((item, idx) => (<DetailPlan key={item.detail_plan_id} idx={idx+1} content={item.content} complete={item.complete}/>))}</div>
        </div>
    );
}
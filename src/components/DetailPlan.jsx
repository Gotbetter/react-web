import { useState, useEffect } from 'react';
import '../componentsCssFile/DetailPlan.css';
import ShowDetailPlan from './ShowDetailPlan';
import instance from '../api/axios';

export default function DetailPlan ({week, participantId}) {
    
    const [contentList, setContentList] = useState([]);
    const [planId, setPlanId] =useState(0);
    const [planContent, setPlanContent] = useState('');
    const [aboutDetailPlan, setAboutDetailPlan] = useState();
    
    const getDetailPlan = async () => {
        
            try{
                const response = await instance.get(`/plans/${participantId}?week=${week}`,
                {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
                setPlanId(response.data.plan_id);
            }
            catch(error){
                console.log('error!');
            }
        
    }

    const getDetailPlan2 = async () => {
            if(planId === 0){
                return;
            }
            try{
                const response = await instance.get(`/plans/${planId}/details`,
                {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
                setContentList(response.data);
                }
            catch(error){
                console.log('error!');
                }
    }
   
    const createDetailPlan = async () => {
        try {
            const response = await instance.post(`plans/${planId}/details`, {content: planContent},
            {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
            //console.log(response);
            //setAboutDetailPlan(response.data);
            
            window.location.reload();
        }
        catch(error){
            console.log('create detail plan error!');
            if (planContent === ''){
                alert('계획 내용을 적어 주세요!');
            }
            else if (error.response.status === 400){
                alert('잘못된 요청입니다!');
            }
            else if (error.response.status === 404){
                alert('없는 계획입니다!');
            }
            else if (error.response.status === 403){
                if (error.response.data.errors[0].errorMessage === "It's not the day."){
                    alert('계획을 생성할 수 있는 날짜가 아닙니다!');
                }
                else {
                    alert('본인의 계획이 아닙니다!');
                }
            }
        }
    }
    console.log(aboutDetailPlan);
    useEffect(() => {getDetailPlan();}, []);
    useEffect(() => {getDetailPlan2();}, [planId]);
    return (
        <div className='plans'>
            <h1>{week}주차 세부 계획</h1>
            <div>{contentList.map((item) => (<ShowDetailPlan key={item.detail_plan_id} content={item.content} detailPlanId={item.detail_plan_id}/>))}</div>
            <input placeholder='세부 계획 내용을 입력하세요.' onChange={(e) => {setPlanContent(e.target.value)}} className='plansinput'></input>
            <button onClick={createDetailPlan} className='createbtn'>+</button>
        </div>
    );
}
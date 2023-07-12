import { useLocation, useNavigate } from "react-router-dom";
import instance from "../api/axios";
import { useEffect, useState } from "react";
import './AboutRoomPage.css';
import Participants from "../components/Participants";
import moment from "moment";
import Ranking from "../components/Ranking";

export default function AboutRoomPage () {

    const location = useLocation();
    const [roomInfor, setRoomInfor] = useState({});
    const [participantsInfo, setParticipantsInfo] = useState([]);
    const [participantId, setParticipantId] = useState('');
    const [authId, setAuthId] = useState('');
    const [dDay, setDday] =useState(0);
    const [dDayToFixDay, setDdayToFixDay] = useState(0);
    const [startDate, setStartDate] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [planId, setPlanId] = useState(0);
    const [currentWeekPlan, setCurrentWeekPlan] = useState([]);
    const [rankingData, setRankingData] = useState([]);
    const roomId = location.state.roomId;

    const getInfo = async () => { // 방 정보 가져오는 함수
        try {
        const response = await instance.get(`/rooms/${roomId}`, 
        {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
        setRoomInfor(response.data);
        }
        catch(errer) {
            console.log("error!");
        }

    }

    const getParticipantInfo = async () => { // 방의 참가자 목록 가져오는 함수
        try {
            const response = await instance.get(`/participants/${roomId}?accepted=${true}`,
            {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
            const _participantsInfo = await response.data.map((item) => ({
                participantId: item.participant_id,
                userId: item.user_id,
                authId: item.auth_id,
                userName: item.username,
                email: item.email,
                profile: item.profile,
                authority: item.authority
               })
            );
            setParticipantsInfo(participantsInfo.concat(_participantsInfo));
        
        }
        catch(error){
            console.log("get participants error!");
        }
    }

    const getCurrentWeekPlan = async () => { // 나의 이번 주 걔획 가져오기 위해 유저 정보 요청하는 함수 (참가자 목록 중 auth_id 일치 유저 찾기 위함)
        try {
            const response = await instance.get('/users', {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
            setAuthId(response.data.auth_id);
        }
        catch(error){
            console.log('error~');
        }
    }

    const getCurrentWeekPlan2 = () => {
        if (!participantsInfo){
            return;
        }
        else{
            for(let i = 0; i<participantsInfo.length; i++)
            {
                if(participantsInfo[i].authId === authId){
                    setParticipantId(participantsInfo[i].participantId);
                }
            }
        }
    }
   
    const getCurrentWeekPlan3 = async () => { // 가져온 참가자 목록
        if (!participantId){
            return;
        }
        try{
            const response = await instance.get(`/plans/${participantId}?week=${roomInfor.current_week}`, 
            {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
            setStartDate(response.data.start_date);
            setTargetDate(response.data.target_date);
            setPlanId(response.data.plan_id);
            }
        catch(error){
            console.log('계획 가져오기 실패!');
        }
    
    }

    const getCurrentWeekPlan4 = async () => {
        if (planId === 0){
            return;
        }
        try {
            const response = await instance.get(`/plans/${planId}/details`,
            {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
            console.log(response);
            const _currentWeekPlan = await response.data.map((item) => ({
                detailPlanId: item.detail_plan_id,
                content: item.content,
                complete: item.complete,
                approveComment: item.approve_comment,
                rejected: item.rejected,
                planId: item.plan_id,
                detailPlanDislikeCount: item.detail_plan_dislike_count,
                detailPlanDislikeChecked: item.detail_plan_dislike_checked
            }));
            setCurrentWeekPlan(currentWeekPlan.concat(_currentWeekPlan));
        }
        catch(error){
            console.log('세부 계획 가져오기 실패');
        }
   }

   const getDday = () => {
        if (startDate === '' || targetDate === ''){
            return;
        }
        const date0 = moment().format("YYYY-MM-DD");
        const date1 = moment(targetDate);
        const fixDay = moment(startDate).add(3, 'd');
        console.log(fixDay);
        const differ = date1.diff(date0, 'd');
        const differ2 = fixDay.diff(date0, 'd');
        console.log('differ', differ, differ2, '시작, 끝, fix', startDate, targetDate, fixDay);
        setDday(differ);
        setDdayToFixDay(differ2);
   }

   const getRanking = async () => {
        try{
            const response = await instance.get(`/rooms/${roomId}/rank`,
            {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}});
            console.log(response);
            setRankingData(response.data);
        }
        catch(error){
            console.log('get ranking error');
        }
   }
    
    useEffect(() => {getInfo(); getParticipantInfo(); getCurrentWeekPlan(); getRanking();}, []);
    useEffect(() => {getCurrentWeekPlan2();}, [participantsInfo, authId]);
    useEffect(() => {getCurrentWeekPlan3();}, [participantId]);
    useEffect(() => {getDday();}, [startDate, targetDate]);
    useEffect(() => {getCurrentWeekPlan4();}, [planId]);

    console.log('사용자 아이디:', authId, '사용자 목록:', participantsInfo, '방 정보:', roomInfor);
   
    return (    
        <div className="mine">
            <h1 className="roomTitle">{roomInfor.title}</h1>
            <div className="sp"><h3><span className="sp1">전체 주차 : {roomInfor.week} </span> <span className="sp2">현재 주차 : {roomInfor.current_week}</span></h3></div>
           
        <div className="dDay">
            <span className="sp3">계획 고정까지 D-{dDayToFixDay}</span>
            <span className="sp4">이번 계획 마감까지 D-{dDay}</span>
        </div>

        <div className="currentWeekPlan">
            <h3>나의 이번 주 계획</h3>
            {currentWeekPlan.map((item) => (<div>{item.content}</div>))}
        </div>

        <div className="party">
            <h3>참가자</h3>
            <div>
                {participantsInfo.map((item) => (<Participants key={item.userId} authId={item.authId} 
                email={item.email} userName={item.userName} planId={planId} week={roomInfor.week} participantId={item.participantId}/>))}
            </div>
        </div>
        <div className="rank">
                <h3>현재 랭킹</h3>
                <div>{rankingData.map((item) => (<Ranking key={item.rank} userName={item.username} rank={item.rank} refund={item.refund}/>))}</div>
        </div>

        </div>
    )
}
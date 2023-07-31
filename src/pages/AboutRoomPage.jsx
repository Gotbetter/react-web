import { useLocation, useNavigate } from "react-router-dom";
import instance from "../api/axios";
import { useEffect, useState } from "react";
import '../pagesCssFile/AboutRoomPage.css';
import Participants from "../components/Participants";
import Ranking from "../components/Ranking";
import RoomInformation from "../components/RoomInformation";
import AboutDday from "../components/AboutDday";
import AboutWeeks from "../components/AboutWeeks";
import CurrentWeekPlan from "../components/CurrentWeekPlan";

export default function AboutRoomPage () {

    const location = useLocation();
    const [roomInfor, setRoomInfor] = useState({});
    const [participantsInfo, setParticipantsInfo] = useState([]);
    const [participantId, setParticipantId] = useState('');
    const [authId, setAuthId] = useState('');
    
    const [startDate, setStartDate] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [planId, setPlanId] = useState(0);
    const [currentWeekPlan, setCurrentWeekPlan] = useState([]);

    const [userId, setUserId] = useState('');
    const roomId = location.state.roomId;

    const movePage = useNavigate();
    const moveToJoinPage = () => {
        movePage('/joinPage', {state: {roomId: roomId, userId: userId}});
    }

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
            setUserId(response.data.user_id);
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
        if (!participantId || roomInfor.current_week === undefined){
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
   
    useEffect(() => {getInfo(); getParticipantInfo(); getCurrentWeekPlan();}, []);
    useEffect(() => {getCurrentWeekPlan2();}, [participantsInfo, authId]);
    useEffect(() => {getCurrentWeekPlan3();}, [participantId]);
    useEffect(() => {getCurrentWeekPlan4();}, [planId]);
    
    return (    
        <div className="mine">
           
            <div>
                <AboutWeeks title={roomInfor.title} allWeek={roomInfor.week} currentWeek={roomInfor.current_week}/>
            </div>

            <div>
                <AboutDday startDate={startDate} targetDate={targetDate}/>
            </div>
       
            <div>
                {<CurrentWeekPlan currentWeekPlan={currentWeekPlan}/>}
            </div>

            <div className="party">
                <h3>참가자</h3>
                <div className="fcontainer">
                    {participantsInfo.map((item) => (<div className="par"><Participants key={item.userId}
                    userName={item.userName} planId={planId} week={roomInfor.current_week} participantId={item.participantId}/></div>))}
                </div>
            </div>

            <div className="rank">
                <h3>현재 랭킹</h3>
                <Ranking roomId={roomId}/>
            </div>

            <div className="roominformation">
                <h3>방 정보</h3>
                <RoomInformation title={roomInfor.title} maxUserNum={roomInfor.max_user_num} currentUserNum={roomInfor.current_user_num}
                startDate={roomInfor.start_date} account={roomInfor.account} roomCode={roomInfor.room_code}/>
            </div>

            <div>
                <button className="joinbtn" onClick={moveToJoinPage}>방 참가 요청 수락하기</button>
            </div>

        </div>
    )
}
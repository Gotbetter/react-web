import React, { useState } from "react";
import instance from "../api/axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../pagesCssFile/CreateRoomPage.css";
import { ko } from 'date-fns/esm/locale';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/ko';
import {IoIosArrowBack} from "react-icons/io"

import study from "../img/study.png";
import diet from "../img/diet.png";
import coding from "../img/coding.png";
import emotion from "../img/emotion.png";
import etc from "../img/etc.png";
import exercise from "../img/exercise.png";
import license from "../img/license.png";
import lifestyle from "../img/lifestyle.png";
import testTaker from "../img/testTaker.png";

export default function CreateRoomPage () {
   
    const [roomName, setRoomName] = useState("");
    const [roomPersonnel, setRoomPersonnel] = useState(2);
    const [startDate, setStartDate] = useState(new Date());
    const [week, setWeek] = useState(1);
    const [entryFee, setEntryFee] = useState(5000);
    const [account, setAccount] = useState("");
    const [rule, setRule] = useState("R1");
    const [roomCategory, setRoomCategory] = useState("");
    const [roomDescription, setRoomDescription] = useState("");
    const [onStyle, setOnStyle] = useState('study');

    const currentWeek = 1;
    let participantID = '';
    
    const kindOfArray = {
        ENTRYFEE: 5000,
        PERSONNEL: 0,
        PERIOD: 1
    }

    const dateNum = moment(startDate).format('YYYY-MM-DD'); // 달력에서 선택한 날짜 포맷 2023-06-23
    const maxNum = Number(roomPersonnel); // 선택된 값 모두 서버에서 지정한 데이터 타입인 숫자로 변환
    const weekNum = Number(week);
    const feeNum = Number(entryFee);

    const createArray = (kind) => {
        let arr = [];
        if (kind === 0)
            for (let i = 1; i <= 6; i++)
                arr.push(i);
        else if (kind === 1)
            for (let i = kind; i <= 48; i++)
                arr.push(i);
        else 
            for (let i = kind; i <= 100000; i+=5000)
            arr.push(i);

        return arr;
    }

    const arrayAboutPersonnel = createArray(kindOfArray.PERSONNEL);
    const arrayAboutPeriod = createArray(kindOfArray.PERIOD);
    const arrayAboutEntryfee = createArray(kindOfArray.ENTRYFEE);

    const movePage = useNavigate();
    const backToHomePage = () => {
        movePage('/rooms')
    }

    const submitInfo = async () => {
        try {
            const response = await instance.post('/rooms', 
            {title: roomName, 
            max_user_num: maxNum,
            start_date: dateNum,
            week: weekNum,
            current_week: currentWeek,
            entry_fee: feeNum,
            rule_code: rule,
            account: account,
            room_category_code: roomCategory,
            description: roomDescription,
            }, {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}})
            participantID = response.data.participant_id;
            try {
                await instance.post('/plans', {participant_id: participantID},
                {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`}});
                console.log("방장 계획 데이터 공간 생성 완료!");
            }
            catch(error) {
                console.log("방장 계획 데이터 공간 생성 실패!");
            }
            backToHomePage(); // 방 성공적으로 생성 후 홈페이지로 돌아가기
        
        }
        catch(error){
            console.log("error!");
            if (roomName === "" && account === "")
                alert("방 이름과 계좌 정보를 입력해 주세요!");
            else if (account === "")
                alert("계좌 정보를 입력해 주세요!");
            else if (roomName === "")
                alert("방 이름을 입력해 주세요!");
            else
                alert("계좌 정보를 다시 한번 확인해 주세요!");
        }
    }

    const ruleHandler = () => {
        setRule("R1");
    }

    const ruleHandler2 = () => {
        setRule("R2");
    }
    
    const selectStyle = {
        border: '3px solid',
        borderRadius: '10px',
        paddingLeft: '15px',
        paddingRight: '15px',
        paddingBottom: '10px'
    }

    return ( 
        <div>
            <span className="back" onClick={backToHomePage}><IoIosArrowBack size="50px"/></span>
            <h1 className="title">스터디룸 만들기</h1>
            <div className="my">
            <div><h3>스터디룸 이름</h3>
            <input className="inputStyle" onChange={(e) => setRoomName(e.target.value)}></input>
            </div>

            <div>
                <h3>방 카테고리</h3>
                <div className="flex-container">
                    <div className="flex-item" onClick={() => {setRoomCategory('study'); setOnStyle('study'); }} style={onStyle === 'study' ? selectStyle : null}><img alt="study" src={study}/><p className="aboutCategory">공부</p></div>
                    <div className="flex-item" onClick={() => {setRoomCategory('exercise'); setOnStyle('exercise');}} style={onStyle === 'exercise' ? selectStyle : null}><img alt="exercise" src={exercise}/><p className="aboutCategory">운동</p></div>
                    <div className="flex-item" onClick={() => {setRoomCategory('develop'); setOnStyle('develop');}} style={onStyle === 'develop' ? selectStyle : null}><img alt="coding" src={coding}/><p className="aboutCategory">개발</p></div>
                    <div className="flex-item" onClick={() => {setRoomCategory('diet'); setOnStyle('diet');}} style={onStyle === 'diet' ? selectStyle : null}><img alt="diet" src={diet}/><p className="aboutCategory">다이어트</p></div>
                    <div className="flex-item" onClick={() => {setRoomCategory('emotion'); setOnStyle('emotion')}} style={onStyle === 'emotion' ? selectStyle : null}><img alt="emotion" src={emotion}/><p className="aboutCategory">정서관리</p></div>
                    <div className="flex-item" onClick={() => {setRoomCategory('license'); setOnStyle('license');}} style={onStyle === 'license' ? selectStyle : null}><img alt="license" src={license}/><p className="aboutCategory">자격증</p></div>
                    <div className="flex-item" onClick={() => {setRoomCategory('lifestyle'); setOnStyle('lifestyle')}} style={onStyle === 'lifestyle' ? selectStyle : null}><img alt="lifestyle" src={lifestyle}/><p className="aboutCategory">생활습관</p></div>
                    <div className="flex-item" onClick={() => {setRoomCategory('testTaker'); setOnStyle('testTaker')}} style={onStyle === 'testTaker' ? selectStyle : null}><img alt="testTaker" src={testTaker}/><p className="aboutCategory">수험생</p></div>
                    <div className="flex-item" onClick={() => {setRoomCategory('etc'); setOnStyle('etc');}} style={onStyle === 'etc' ? selectStyle : null}><img alt="etc" src={etc}/><p className="aboutCategory">기타</p></div>
                </div>
            </div>

            <div>
                <h3>방 소개글</h3>
                <input className="inputStyle" onChange={(e) => setRoomDescription(e.target.value)}></input>
            </div>

            <div><h3>인원</h3>
            <select onChange={(e) => setRoomPersonnel(e.target.value)}>
               {arrayAboutPersonnel.map((item) => <option value = {item} key = {item}>{item}명</option>)}
            </select>
            </div>

            <div className="ing">
                <h3>시작일</h3>
                <DatePicker className="date" selected ={startDate} onChange={(e) => setStartDate(e)} dateFormat='yyyy-MM-dd' locale={ko} minDate={new Date()} withPortal/> 
            </div>

            <div>
            <h3>기간 선택</h3> 
            <select onChange={(e) => setWeek(e.target.value)}>  
               {arrayAboutPeriod.map((item) => (<option value = {item} key = {item}>{item}주</option>))}
            </select> 
            </div>
            
            <div>
            <h3>참가비</h3>
            <select onChange={(e) => setEntryFee(e.target.value)}>
               {arrayAboutEntryfee.map((item) => <option value = {item} key = {item}>{item}원</option>)}
            </select>
            </div>

            <div>
            <h3>계좌 정보</h3>
            <input className="inputStyle" onChange={(e) => setAccount(e.target.value)}></input>
            </div>

            <div className="selectRule">
            <div><button onClick={ruleHandler}>1등 200%, 2~5등 100%, 5등 0% 환급</button></div>
            <div className="btn2"><button onClick={ruleHandler2}>1등 180%, 2~5등 90%, 6등 60% 환급</button></div>
            </div>
            <div className="submitButton"><button onClick={submitInfo}>만들기</button></div>
            </div>
        </div>
    )
}


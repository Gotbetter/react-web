import React, { useState, useEffect } from "react";
import instance from "../api/axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "./CreateRoomPage.css";
import { ko } from 'date-fns/esm/locale';
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import 'moment/locale/ko';
import {IoIosArrowBack} from "react-icons/io"


export default function CreateRoomPage () {
   
    const [roomName, setRoomName] = useState("");
    const [roomPersonnel, setRoomPersonnel] = useState(2);
    const [startDate, setStartDate] = useState(new Date());
    const [week, setWeek] = useState(1);
    const [entryFee, setEntryFee] = useState(5000);
    const [account, setAccount] = useState("");
    const [rule, setRule] = useState(1);
    const currentWeek = 1;

    const dateNum = moment(startDate).format('YYYY-MM-DD'); // 달력에서 선택한 날짜 포맷 2023-06-23
    const maxNum = Number(roomPersonnel); // 선택된 값 모두 서버에서 지정한 데이터 타입인 숫자로 변환
    const weekNum = Number(week);
    const feeNum = Number(entryFee);

    console.log("시작 날짜: ", dateNum);
    console.log("방 이름: ", roomName);
    console.log("방 인원: ", roomPersonnel);
    console.log("방 규칙 번호: ", rule);

    const createArray = (a) => {
        let arr = [];
        if (a === 0)
            for (let i = 1; i <= 6; i++)
                arr.push(i);
        else if (a === 1)
            for (let i = a; i <= 48; i++)
                arr.push(i);
        else 
            for (let i = a; i <= 100000; i+=5000)
            arr.push(i);

        return arr;
    }
    const arr0 = createArray(0);
    const arr1 = createArray(1);
    const arr2 = createArray(5000);
    console.log(arr1, arr2);

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
            rule_id: rule,
            account: account
            }, {headers: {Authorization: `Bearer ${localStorage.getItem("access_token")}`,}})

            console.log('서버 응답 데이터: ', response);
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
        setRule(1);
    }

    const ruleHandler2 = () => {
        setRule(2);
    }
    
    return ( // 주차는 48주까지 map으로 돌리기 참가비는 10만원까지 
        <div>
            <span className="back" onClick={backToHomePage}><IoIosArrowBack size="50px"/></span>
            <h1 className="title">스터디룸 만들기</h1>
            <div className="my">
            <div><h3>스터디룸 이름</h3>
            <input className="inputStyle" onChange={(e) => setRoomName(e.target.value)}></input>
            </div>

            <div><h3>인원</h3>
            <select onChange={(e) => setRoomPersonnel(e.target.value)}>
               {arr0.map((item) => <option value = {item} key = {item}>{item}명</option>)}
            </select>
            </div>

            <div className="ing">
                <h3>시작일</h3>
                <DatePicker className="date" selected ={startDate} onChange={(e) => setStartDate(e)} dateFormat='yyyy-MM-dd' locale={ko} minDate={new Date()} withPortal/> 
            </div>

            <div>
            <h3>기간 선택</h3> 
            <select onChange={(e) => setWeek(e.target.value)}>  
               {arr1.map((item) => (<option value = {item} key = {item}>{item}주</option>))}
            </select> 
            </div>
            
            <div>
            <h3>참가비</h3>
            <select onChange={(e) => setEntryFee(e.target.value)}>
               {arr2.map((item) => <option value = {item} key = {item}>{item}원</option>)}
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


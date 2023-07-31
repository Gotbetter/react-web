import moment from "moment";
import { useEffect, useState } from "react";

export default function AboutDday ({startDate, targetDate}) {
    const [dDay, setDday] = useState(0);
    const [dDayToFixDay, setDdayToFixDay] = useState(0);
    
    const getDday = () => {
        
        if (startDate === '' || targetDate === ''){
            
            return;
        }
        const date0 = moment().format("YYYY-MM-DD");
        const date1 = moment(targetDate);
        const fixDay = moment(startDate).add(3, 'd');
        const differ = date1.diff(date0, 'd');
        const differ2 = fixDay.diff(date0, 'd');
        console.log('differ', differ, differ2, '시작, 끝, fix', startDate, targetDate, fixDay);
        if (differ < 0){
            setDday(0);
        }
        if(differ2 < 0){
            setDdayToFixDay(0);
        }
        if (differ >= 0){
        setDday(differ);
        }
        if (differ2 >= 0){
            setDdayToFixDay(differ2);
        }
        console.log('dday 확인:', dDay, dDayToFixDay);
   }
    useEffect(() => {getDday();}, [startDate]);
   
    return (
        <div className="dDay">
            <span className="sp3">계획 고정까지 D-{dDayToFixDay}</span>
            <span className="sp4">이번 계획 마감까지 D-{dDay}</span>
        </div>
    )
}
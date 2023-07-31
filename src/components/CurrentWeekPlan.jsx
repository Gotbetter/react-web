import '../componentsCssFile/CurrentWeekPlan.css';
export default function CurrentWeekPlan ({currentWeekPlan}) {
    
    return (
        <div className="currentWeekPlan">
        <h3>나의 이번 주 계획</h3>
        {currentWeekPlan.map((item, idx) => (<div className="weekplan" key={idx}>{item.content}</div>))}
        </div>
    );
}
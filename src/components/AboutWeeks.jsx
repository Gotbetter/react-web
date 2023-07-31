export default function AboutWeeks ({title, allWeek, currentWeek}) {
    return (
        <div>
            <h1 className="roomTitle">{title}</h1>
            <div className="sp"><h3><span className="sp1">전체 주차 : {allWeek} </span> <span className="sp2">현재 주차 : {currentWeek}</span></h3>
            </div>
        </div>
    );
}
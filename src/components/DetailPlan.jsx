import './DetailPlan.css';

export default function DetailPlan ({content, complete, idx}) {
    return (
        <div className='plans'>
            <h1>{idx}주차 세부 계획!</h1>
            <h2>{content}</h2>
        </div>
    );
}
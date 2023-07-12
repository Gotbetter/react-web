import './Ranking.css';
export default function Ranking ({userName, rank, refund}) {

    return (
        <div id="a">
            <h1><span className='left'>{rank}등</span><span className='mid'>{userName}</span><span className='right'>{refund}원</span></h1>
        </div>
    );
}
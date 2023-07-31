import '../componentsCssFile/RoomInformation.css';
export default function RoomInformation ({title, maxUserNum, currentUserNum, startDate, account, roomCode}) {
    
    return (
        <div className='infor'>
            <h4>방 이름: {title} <br></br>
                방 코드: {roomCode} <br></br>
                계좌 번호: {account} <br></br>
                시작 날짜: {startDate} <br></br>
                최대 인원: {maxUserNum} <br></br>
                현재 인원: {currentUserNum}
            </h4>
        </div>
    );
}
import { useState, useRef } from "react";
export default function ImgUpload () {
    const fileInput = useRef(null);
    const [mainImg, setMainImg] = useState('');
    const handleButtonClick = e => {
        fileInput.current.click();
    }
    const handleChange = e => {
        //console.log(e.target.files[0]);
        var reader = new FileReader();
        reader.onload = function(event) {
            setMainImg(event.target.result);
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    return (
    <div>
        <button onClick={handleButtonClick}>인증 사진 올리기</button>
        <input type='file' id='fileupload' multiple={true} style={{display: 'none'}} ref={fileInput} onChange={handleChange}/>
        <img alt='' src={mainImg} width='400px' height='400px'/>
    </div> 
    );
}
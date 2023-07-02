import React, {useState} from "react";
import "./LoginPage.css";
//import axios from "axios";
import instance from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {

    const movePage = useNavigate();
    const backLogin = () => {
        movePage('/');
    }
    
    const [auth_id, setAuthId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [checkingId, setCheckingId] = useState(false); // 아이디 중복확인 여부

    const signUp = async () => {
        console.log("sign up start");
        if (auth_id === "" || password === "" || username === "" || email === ""){ // 모든 입력사항 입력 요구
            return alert ("입력사항을 모두 입력해 주세요.");
        }
        if (checkingId === false){
            return alert("아이디 중복 확인을 해주세요!"); // 아이디 중복확인 체크 여부 확인
        }
        if (password !== confirmPassword){ // 비밀번호와 비밀번호 확인 타이핑 일치 여부 확인
            return alert ("비밀번호와 비밀번호 확인이 다릅니다.");
        }

       try {
            const response = await instance.post('/users', { // instance로 url 중복 입력 방지, 프록시에 서버 주소 /api로 변환되어 있고 이를 instance로 대체시켜 axios 치지 않아도 됨.
            auth_id: auth_id,
            password: password,
            username: username,
            email: email
        });
        // 200대 status 통신 성공
        console.log(response);
        console.log("signup!");
        backLogin(); // 회원가입 완료되면 로그인 화면으로 돌아가기
        alert("회원가입이 완료되었습니다!");

        }
        catch (error) { // 에러 캐치
            console.log("error!");
            console.log(error);
            alert("회원가입이 정상적으로 되지 않았습니다.")
        }
        
    }

    const idCheck = async () => {
        if (auth_id === "") // 아이디 입력칸 공백일 경우 alert 반환
        {
            return alert("아이디를 입력해주세요!");
        }
        try {
            const response = await instance.post('/users/verify', {auth_id: auth_id}); // 아이디 값을 서버로 보내기
            console.log(response);
            if(checkingId === false){ // 아이디 중복확인 여부 true로 바꿔주기
                setCheckingId(current => !current);
            }
            console.log(checkingId);
            return alert("사용 가능한 아이디입니다.");
            }
        
        catch(error){ // 409 conflict 에러 => 아이디 중복임 
            
            console.log(error);
            alert("중복된 아이디입니다.")
            
        }
        
    }

    return (
        <div className="login-form">
            <div className="form-group">

                <label>Auth ID</label>
                <input id="authId" className="form-control" value={auth_id} onChange={(e) => setAuthId(e.target.value)}/>
                <button id="check" className="btn" onClick = {idCheck}>아이디 중복 확인</button>

                <label>Password</label>
                <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <label>Confirm Password</label>
                <input id="confirmpassword" type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>

                <label>Nickname</label>
                <input id="nickname" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)}/>

                <label>E-mail</label>
                <input id="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <br></br>

            </div>
            <button className="btn" onClick={signUp}>회원가입</button>
        </div>
    )
   

    }

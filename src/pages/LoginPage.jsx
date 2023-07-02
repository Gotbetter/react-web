import React, { useState } from "react";
import instance from "../api/axios";
//import requests from "../api/requests";
import "./LoginPage.css"
//import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

  const [authId, setAuthId] = useState("");
  const [password, setPassword] = useState("");
  
  const movePage = useNavigate(); 
  const goSignUp = () => {
    movePage('/users'); 
  }
  const goRooms = () => {
    movePage('/rooms');
  }

  const login = async () => {
    try {
      const response = await instance.post( '/users/login', {
        auth_id: authId,
        password: password,
      });

        localStorage.setItem('access_token',response.data.access_token);
        console.log(response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        console.log(response);
        alert("로그인 완료!");
        goRooms();


    } catch (error) {
      console.error(error);
      if (authId === "" & password === "") // 아이디, 비밀번호 모두 공백인 경우
      {
        alert("아이디와 비밀번호를 입력해 주세요!");
      }
      else if(authId === "") // 아이디가 공백인 경우
      {
        alert("아이디를 입력해 주세요!");
      }
      else if (password === "") // 비밀번호가 공백인 경우
      {
        alert("비밀번호를 입력해 주세요!");
      }
      else { // 아이디와 비밀번호가 등록되어 있지 않을 때
        alert("아이디와 비밀번호를 확인해 주세요!");
      }
    }
  }

  return (
    <div className="login-form">
      <div className="form-group">
        <label>Auth ID</label>
        <input id="authId" className="form-control" required value={authId} onChange={(e) => setAuthId(e.target.value)}/>
      </div>

      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control" id="password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      
      <button className="btn" onClick={login}>로그인</button>
      <br></br>
      <button className="btn" onClick={goSignUp}>회원가입</button> 
    </div>
  );
}

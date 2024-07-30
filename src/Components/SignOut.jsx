import React from 'react'
import { signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase';

export default function SignOut() {
    const navigate = useNavigate();

    const Logout = ()=>{
    signOut(auth).then(() => {
    toast.success("Logged out successfully!");
    navigate("/");
}).catch((error) => {
    toast.error("An issue occured, please try again!");
    console.log(error);
})}
  return (
    <button onClick={Logout} >Logout</button>
  )
}

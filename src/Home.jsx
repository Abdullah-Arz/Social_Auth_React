import React, { useEffect, useState } from 'react'
import { auth } from './config/Firebase-config'
import { useNavigate } from 'react-router-dom';
import { CirclesWithBar, ProgressBar, Triangle } from 'react-loader-spinner';
import { ProviderId, signOut } from 'firebase/auth';

function Home() {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [creationTime,setCreationTime]=useState('')
    const [lastLoginAt,setlastLoginAt]=useState('')
    const [photoURL,setphotoURL]=useState('')
    const [loader,setloader]=useState(true)
    const Navigate=useNavigate();
    const Getdata=()=>{
        setloader(true)
        setTimeout(()=>{
           
            console.log('auth',auth)
            if(auth){
                console.log("auth.hasOwnProperty('currentUser')",auth.hasOwnProperty('currentUser'))
            if(auth.currentUser !== null){
                const user = auth?.currentUser;

                setName(user?.displayName)
                setEmail(user?.email)
                setCreationTime(user?.metadata.creationTime)
                setphotoURL(user?.photoURL)
               
            }
            else{
                Navigate('/')
            }
               
            }
            else{
               
            }
        setloader(false)

        },500)
    }
    useEffect(()=>{
        Getdata()
       
          
        },[])
        const signOutFunc = () => {
            signOut(auth).then((res) => {
              Navigate('/') 
            })
            .catch((err) => {
              console.log(err);
            });
          };
   

  return (
    <div>{
        
        loader?<div style={{marginTop:'33vh',textAlign:'center'}}>
                <CirclesWithBar
            height="150"
            width="150"
            color="#4fa94d"
            wrapperStyle={{}}
            wrapperClass="justify-content-md-center"
            visible={true}
            outerCircleColor="white"
            innerCircleColor="white"
            barColor="white"
            ariaLabel='circles-with-bar-loading'
           
            />
        </div>:<>
        <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
         <div className="card p-4">
        <div className=" image d-flex flex-column justify-content-center align-items-center">
            <button className="btn btn-secondary"> <img src={photoURL != ""?photoURL:"https://i.imgur.com/wvxPV9S.png"} height="100" width="100" /></button>
            <span className="name mt-3">{name}</span> <span className="idd">{email}</span>
            <div className="d-flex flex-row justify-content-center align-items-center gap-2"></div>
                <div className=" px-2 rounded mt-4 date "> <span className="join">{creationTime}</span> </div>
          
      
            <div className="gap-3 mt-3 icons d-flex flex-row justify-content-center align-items-center">
                <span><i className="fa fa-twitter"></i></span> <span><i className="fa fa-facebook-f"></i></span>
                <span><i className="fa fa-instagram"></i></span> <span><i className="fa fa-linkedin"></i></span> </div>
            <div className=" d-flex mt-2"> <button className="btn1 btn-dark" onClick={()=>{signOutFunc()}}>Logout</button> </div>

        </div>
    </div>
         </div>
        
        </>
        }
        
    </div>
  )
}

export default Home

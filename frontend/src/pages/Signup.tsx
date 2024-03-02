import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/Input";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import axios from "axios";
// import ReactModal from 'react-modal';
import {   useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";

export function Singup(){


    // const [isOpen, setIsOpen] = useState<boolean>(false);
    const navigate = useNavigate()
    // const token = localStorage.getItem("token");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          // Assuming you want to redirect to the dashboard if the user is already authenticated
          navigate("/blogs");
        }else{
          navigate("/signup")
        }
      }, [navigate]);
    
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    if (loading ) {
      return <div>
      
      
          <div className="h-screen flex flex-col justify-center">
              
              <div className="flex justify-center">
              <span> Please wait..</span>  <Spinner />
              </div>
          </div>
      </div>
  }
 
    return <div>
        <Header  name2="Signin"  route2={()=>{navigate('/signin')}}/>
        <div className="flex  justify-center  h-screen">
            <div className=" flex flex-col justify-center">
            <div className="  rounded-sm w-80 text-center  p-2 px-4 h-max    ">
                <Heading name = "Join Now."/>
                <div className="mt-12">
                <InputBox onchange={(e:any)=>{ setEmail(e.target.value)}} name="Email" placeholder="Enter your email"/>
                <InputBox onchange={(e:any)=>{ setName(e.target.value)}} name="Name" placeholder="Enter your full name"/>
                <InputBox onchange={(e:any)=>{ setPassword(e.target.value)}} name="Password" placeholder="Enter you password"/>

                <Button name="Signup" onclick={ async ()=>{
                    await setLoading(true)
                  const response =  await axios.post("https://medium-app.sahupravin960.workers.dev/api/v1/signup",
                    {
                        email,
                        name,
                        password
                    })
                    
                 
                    if(response.data.msg === "user existed"){
                        alert("user existed")
                        // setIsOpen(true)
                      

                    }
                   else{ localStorage.setItem("token", response.data.token);
                   
                    // Redirect to dashboard with the first name as query parameter
                    navigate("/blogs");}
                }}/>
                <SubHeading subheading="Already have an account?" link="Sign in" onclick={()=>{navigate('/signin')}}/>
                </div>
            </div>
            </div>
        </div>
       
    </div>

}
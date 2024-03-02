import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { Button } from "../components/Button";
// import Blink from "./Blink";
// import { useEffect } from "react";
// import ReactModal from 'react-modal';
// import { useState } from "react";
export function Landing(){
    const navigate = useNavigate()
  
    // const [isOpen, setIsOpen] = useState<boolean>(false);
    return <div>
        <div className=" ">
            <Header name2="Sign in" 
route2={()=>{navigate('/signin')}}/>
            
           
        </div>
        <div className="bg-yello h-screen ">
        <div className="flex flex-col justify-around px-8">
                <div className=" font-glory text-7xl font-normal p-3 px-6 " >
                    Stay curious.
                </div>
                <div className=" font-merat text-2xl space-x-2 py-6 px-6 leading-6 ">
                Discover stories, thinking, and <br />
               expertise from writers on any topic.
                </div>
                <div className="p-3">
                    <Button name="Start reading" onclick={()=>{navigate("/signup")}}/>
                </div>
            </div>
            <div className="">
              
            </div>
        </div>
    </div>
}
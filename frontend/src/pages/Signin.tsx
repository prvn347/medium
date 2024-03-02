import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/Input";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import axios from "axios";
// import ReactModal from "react-modal";
import { useEffect, useState } from "react";

export function Signin(){
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          // Assuming you want to redirect to the dashboard if the user is already authenticated
          navigate("/blogs");
        }else{
          navigate("/signin")
        }
      }, [navigate]);

    const [email, setEmail] = useState("");
   
    const [password, setPassword] = useState("");
    return <div>
        <Header  name2="Get Started"  route2={()=>{navigate('/signup')}}/>
        <div className="flex  justify-center  h-screen">
            <div className=" flex flex-col justify-center">
            <div className="  rounded-sm w-80 text-center  p-2 px-4 h-max">
                <Heading name = "Welcome back."/>
                <div className="mt-12">
                <InputBox onchange={(e:any) => {setEmail(e.target.value) }} name="Email" placeholder="Enter you email"/>
                <InputBox onchange={(e:any) => {setPassword(e.target.value) }} name="Password" placeholder="Enter you password"/>

                <Button name="SignIn" onclick={ async ()=>{
                    const response =  await axios.post("https://medium-app.sahupravin960.workers.dev/api/v1/signin",
                    {
                        email,
                     
                        password
                    })
                    // if(response.data.msg === "user existed"){
                    //     <ReactModal
                    //         isOpen={true}
                    //         contentLabel="Example Modal" >
                    //         This is the content of the modal.
                    //     </ReactModal>

                    // }
                    localStorage.setItem("token", response.data.token);
                    // Redirect to dashboard with the first name as query parameter
                    navigate("/blogs");
                }}/>
                <SubHeading subheading="No account?" link="Create one" onclick={()=>{navigate('/signup')}}/>
                </div>
            </div>
            </div>
        </div>
    </div>
}
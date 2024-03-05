import { useNavigate } from "react-router-dom";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/Input";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import axios from "axios";
import { GoogleLogin} from '@react-oauth/google';
// import ReactModal from "react-modal";
import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";

export function Signin(){
  const responseMessage = (response: any) => {
    console.log(response);
};
const errorMessage = (error: void) => {
    console.log(error);
};
// interface Profile {
//   picture: string;
//   name: string;
//   email: string;
// }
// const [ user, setUser ] = useState<CodeResponse  | null>();
// const [ profile, setProfile ] = useState<Profile  | null>();  

// const login = useGoogleLogin({
//     onSuccess: (codeResponse:CodeResponse) => setUser(codeResponse),
//     onError: (error) => console.log('Login Failed:', error)
// });

// useEffect(
//     () => {
//         if (user) {
         
             
//             //  @ts-ignore
//             axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
//                     headers: {  
//                       //  @ts-ignore
//                         Authorization: `Bearer ${user.access_token}`,
//                         Accept: 'application/json'
//                     }
//                 })
//                 .then((res) => {
//                     setProfile(res.data);
//                 })
//                 .catch((err) => console.log(err));
//         }
//     },
//     [ user ]
// );

// log out function to log the user out of google and set the profile array to null
// const logOut = () => {
//     googleLogout();
//     setProfile(null);
// };

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
    const [loading, setLoading] = useState(false);
    if (loading ) {
      return <div>
      
      
          <div className="h-screen flex flex-col justify-center dark:bg-black">
              
              <div className="flex justify-center dark:bg-black">
              <span> Please wait..</span>  <Spinner />
              </div>
          </div>
      </div>
  }
    return <div>
        <Header  name2="Get Started"  route2={()=>{navigate('/signup')}}/>
        <div className="flex  justify-center  h-screen">
            <div className=" flex flex-col justify-center">
            <div className="  rounded-sm w-80 text-center  p-2 px-4 h-max">
                <Heading name = "Welcome back."/>
                
                <div className="mt-12">
                  <div>
            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
        </div>
        <span className=" font-merat text-md font-semibold">OR</span>
                <InputBox onchange={(e:any) => {setEmail(e.target.value) }} name="Email" placeholder="Enter you email"/>
                <InputBox onchange={(e:any) => {setPassword(e.target.value) }} name="Password" placeholder="Enter you password"/>

                <Button name="SignIn" onclick={ async ()=>{
                      await setLoading(true)
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
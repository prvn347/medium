// import { useNavigate } from "react-router-dom";
import {   useState } from "react";
import { Header } from "../components/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Write(){
   
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    // useEffect(() => {
    //   if (token) {
    //     // Assuming you want to redirect to the dashboard if the user is already authenticated
    //     navigate("/blogs");
    //   }else{
    //     alert(" please sign-in first")
    //     navigate("/signin")
    //   }
    // }, []);
    const [title,setTitle] = useState("")
    const [content, setContent] = useState("");


   
// const navigate  = useNavigate()
    return <div>
        <div>
            <div className="  ">
               <Header name2="Publish" route2={ async ()=>{
                 
                if(token){
                    
                    try {
                       await axios.post("https://medium-app.sahupravin960.workers.dev/api/v1/blog",
                 {
                     title,
                     content
                 },
                 {
                    headers: {
                        Authorization: 'Bearer ' + token //the token is a variable which holds the token
                      }

                 }) 
                 navigate("/myblogs")
                    } catch (error) {
                        console.log(error)
                        
                    }
                   
                }
                else{
                    alert("please signin first!")
                }
                 
               }}/>
            </div>
            <section className=" mt-4 ml-1 mr-1 sm:mt-10 ml-3 mr-3">
            <div className=" px-3 ml-1 mr-1 sm: px-10 ml-3 mr-3  ">
                <div className="    ">
                    <div className="border-s-4 h-12 absolute "></div>
                    {/* @ts-ignore */}
                    <input
                    placeholder="Title"
              type="text"
              value={title}
              onChange={(e)=>{
                setTitle(e.target.value)
                }}
              className=" w-screen text-4xl font-serif focus:outline-none block px-3"
            />
                <div className="border-s-4 h-8 absolute "></div>
 {/* @ts-ignore */}
 <textarea placeholder="Tell your story..."
 rows={250}
              value={content}
              onChange={(e)=>{
                setContent(e.target.value)
                }}
                 
              
                
              className=" resize-none break-words  w-full text-2xl font-serif focus:outline-none block px-3"
            />                
                </div>
            </div>
            </section>
        </div>
    </div>
}

{/* <article>
    <header>
        <h2>Blog Post Title</h2>
        <p>Date: January 1, 2024</p>
        <p>Author: John Doe</p>
    </header>
    <section>
        <p>This is the content of the blog post...</p>
        <!-- Other content like images, videos, etc., can be added here -->
    </section>
    <footer>
        <p>Tags: <a href="#">tag1</a>, <a href="#">tag2</a>, <a href="#">tag3</a></p>
    </footer>
</article> */}

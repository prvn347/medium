import { useNavigate, useSearchParams } from "react-router-dom"
import { Article } from "../components/Article"
import { Header } from "../components/Header"
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../components/Spinner";
// import { ProfileName } from "../components/ProfileName"


export function ArticlePage(){
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    // @ts-ignore
    let [searchParams] = useSearchParams();
    const [blog,setBlog]= useState(null)
    const id = searchParams.get("id");
    console.log(id)
    useEffect(()=>{
        axios.get("https://medium-app.sahupravin960.workers.dev/api/v1/blog/" + id,{
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        })
        .then(resp =>{
            
            setBlog(resp.data.blog)
            setLoading(false)
            
        })
    },[])
const navigate = useNavigate()

if (loading || !blog) {
    return <div>
        <Header name2="Write" route2={()=>{navigate('/write')}}/>
    
        <div className="h-screen flex flex-col justify-center">
            
            <div className="flex justify-center">
                <Spinner />
            </div>
        </div>
    </div>
}
    return <div className=" break-words"> 
        <div><Header name2="Write" route2={()=>{navigate('/write')}}/></div>
        <div className=" ">
        
           {blog && ( // Check if blog is not null before rendering
                    <Article 
                                        // @ts-ignore
                        name={blog.author.name} title={blog.title} content={blog.content} 
                    />//you shouldn't use ts ignore
                )}
        </div>
    </div>
}
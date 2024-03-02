import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { PostCard } from "../components/PostCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { BlogSkeleton } from "../components/Skeleton";

export function MyBlogs(){
    const navigate = useNavigate()

    const token = localStorage.getItem("token");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          // Assuming you want to redirect to the dashboard if the user is already authenticated
          navigate("/myblogs");
        } else {
          navigate("/signin");
        }
      }, [navigate]);

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get("https://medium-app.sahupravin960.workers.dev/api/v1/blog/myblogs", {
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
        })
        .then(resp => {
            setBlogs(resp.data.userBlogs)
            setLoading(false)
        })
    }, []);
    
    if (loading) {
        return <div>
                            <Header name1="My blogs" route1={()=>{navigate('/myblogs')}} name2="Write" route2={() => {navigate("/postStories")}} />

            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return (
        <div>

            <div>
                <Header name1="All blogs" route1={()=>{navigate("/blogs")}} name2="Write" route2={() => {navigate("/postStories")}}  />
                <div  onClick={()=>{
             

           
             // Clear the authentication token from localStorage
             localStorage.removeItem("token");
             // Redirect the user to the sign-in page
             navigate("/signin");
 
            
           }} className=" cursor-pointer bg-red-500 flex justify-center">log out</div>
            
            </div>
            <div className="flex flex-col items-center"> {/* Ensure PostCard components are stacked vertically */}
                <span className="font-glory text-2xl font-semibold p-3">My Blogs</span>
                {/* Render each PostCard component inside a block-level container */}
                {blogs.map((blog) => (
                    // @ts-ignore
                    <div key={blog.id} className=""> {/* Use a block-level container to ensure each PostCard appears on a new line */}
                        


                                            {/* @ts-ignore */}
                        <PostCard id={blog.id} title={blog.title} content={blog.content} userName={blog.author.name}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

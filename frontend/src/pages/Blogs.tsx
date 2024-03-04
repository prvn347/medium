import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { PostCard } from "../components/PostCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { BlogSkeleton } from "../components/Skeleton";


export function Blogs(){
    const navigate = useNavigate()
    const token = localStorage.getItem("token");
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
          // Assuming you want to redirect to the dashboard if the user is already authenticated
          navigate("/blogs");
        } else {
          navigate("/signin");
        }
      }, [navigate]);

    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get("https://medium-app.sahupravin960.workers.dev/api/v1/blog", {
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
    return (       <><div>
        <Header name1="My blogs" route1={() => { navigate('/myblogs'); } } name2="Write" route2={() => { navigate("/postStories"); } } />
        <div onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
        } } className="cursor-pointer bg-red-500 flex justify-center">log out</div>
            <div>
                {blogs.map((blog) => (
                    // @ts-ignore
                    <div key={blog.id} className="flex justify-center"> {/* Use a block-level container to ensure each PostCard appears on a new line */}



                        {/* @ts-ignore */}
                        <PostCard id={blog.id} title={blog.title} content={blog.content} userName={blog.author.name || "Anonymous"} />
                    </div>
                ))}

            </div>
        </div></>

        
    );
}

import { useNavigate, useSearchParams } from "react-router-dom"
// import { Article } from "../components/Article"
import { Header } from "../components/Header"
import { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "../components/Spinner";
import { AuthArticle } from "../components/AuthBlogs";
// import { ProfileName } from "../components/ProfileName"


export function AuthArticlePage(){
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");
    // @ts-ignore
    let [searchParams] = useSearchParams();
    const [blog,setBlog]= useState(null)
    const id = searchParams.get("id");
    console.log(id)
    useEffect(() => {
        const cachedBlog = localStorage.getItem(`blog_${id}`);
        if (cachedBlog) {
            setBlog(JSON.parse(cachedBlog));
            setLoading(false);
        } else {
            fetchBlog();
        }
    }, [id, token]);

    const fetchBlog = () => {
        axios.get(`https://medium-app.sahupravin960.workers.dev/api/v1/blog/${id}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(resp => {
            const blogData = resp.data.blog;
            setBlog(blogData);
            localStorage.setItem(`blog_${id}`, JSON.stringify(blogData));
            setLoading(false);
        })
        .catch(error => {
            console.error("Error fetching article:", error);
            setLoading(false);
        });
    };
const navigate = useNavigate()

if (loading || !blog) {
    return <div>
        <Header name2="Write" route2={()=>{navigate('/postStories')}}/>
    
        <div className="h-screen flex flex-col justify-center dark:bg-black">
            
            <div className="flex justify-center dark:bg-black">
                <Spinner />
            </div>
        </div>
    </div>
}
    return <div className=" break-words dark:bg-black h-screen"> 
        <div><Header name2="Write" route2={()=>{navigate('/postStories')}}/></div>
        <div className=" ">
        
           {blog && ( // Check if blog is not null before rendering
                    <AuthArticle 
                    // @ts-ignore
                              id={id}          // @ts-ignore
                        name={blog.author.name} title={blog.title} content={blog.content} date={blog.publishedAt}
                    />//you shouldn't use ts ignore
                )}
        </div>
    </div>
}
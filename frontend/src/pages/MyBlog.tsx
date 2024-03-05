import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { PostCard } from "../components/PostCard";
import { useEffect, useMemo, useRef, useState } from "react";
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
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [list] = useState(["All blogs","Write"]);
    const dropdownRef = useRef();

    useEffect(() => {
      const handleClickOutside = (event: { target: any; }) => {
          // @ts-ignore
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownOpen(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
    const toggleDropDown = () => {
      setDropdownOpen(!isDropdownOpen);
    };
    const handleItemClicks = [
        () => navigate("/blogs"),
        () => navigate("/postStories"),
        // Add more handlers for additional items if needed
      ];
    
    const DropDownlist = useMemo(() => {
        return list.map((el,index) => (
            <div key={el} onClick={handleItemClicks[index]}  className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              {el}
            </div>
          ));   }, [list,handleItemClicks]);

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
                            <Header  name2="Write" route2={() => {navigate("/postStories")}} />

            <div  className="flex justify-center dark:bg-black ">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return (<div className=" overflow-hidden  break-words">

            <div >
                {/* @ts-ignore */}
                <Header newdiv={ <div ref={dropdownRef} className=" relative w-10 h-10 rounded-full bg-black flex items-center justify-center  dark:bg-indigo-400">
                    <span onClick={toggleDropDown} className=" cursor-pointer text-md text-white dark:text-black ">U</span>
                    {isDropdownOpen && (
        <div className="absolute top-3 right-4 mt-8 w-48 bg-white border rounded-lg shadow-lg z-10">
          {DropDownlist}
        </div>
      )}</div>} name2="Write" route2={() => {navigate("/postStories")}}  />
                <div  onClick={()=>{
             

           
             // Clear the authentication token from localStorage
             localStorage.removeItem("token");
             // Redirect the user to the sign-in page
             navigate("/signin");
 
            
           }} className=" cursor-pointer bg-red-500 flex justify-center">log out</div>
            
            </div>
            <div className="flex flex-col items-center dark:bg-black h-screen"> {/* Ensure PostCard components are stacked vertically */}
                <span className="font-glory text-2xl font-semibold p-3">My Blogs</span>
                {/* Render each PostCard component inside a block-level container */}
                {blogs.map((blog) => (
                    // @ts-ignore
                    <div key={blog.id} className=""> {/* Use a block-level container to ensure each PostCard appears on a new line */}
                        


                                            {/* @ts-ignore */}
                        <PostCard route="authArticle" id={blog.id} title={blog.title} content={blog.content} userName={blog.author.name}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

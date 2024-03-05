import { Link} from "react-router-dom";
import { ProfileName } from "./ProfileName";
// import { Button } from "./Button";
// import { useEffect, useState } from "react";
// import axios from "axios";



interface content{
title :string,
content :string,
userName:string,
id:string,
route:string

}
export function PostCard( {title,content,userName,id,route}:content){

  // const token = localStorage.getItem('token')
    const maxLength = 100; // Maximum length of the content before truncation
// const navigate = useNavigate()
    // Function to truncate the text content if it's too long
    const truncateText = (text: string) => {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
      } else {
        return text;
      }
    };
   
  
// const [showBtn,setShowBtn] = useState(false)






    return  <Link to={`/${route}?id=${id}`}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer dark:bg-black dark:text-white ">
        <div className="flex justify-between">
        <ProfileName name={userName}/> 


          
           
        </div>
        <div className="text-xl font-semibold pt-2">
        <span className="font-bold font-merat text-2xl">{title}</span>

        </div>
        <div className="text-md font-thin">
        <p className="font-normal text-md font-merat" >{truncateText(content)}</p>

        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
    </div>
</Link>
     

}
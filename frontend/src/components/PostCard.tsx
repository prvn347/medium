import { Link, useNavigate } from "react-router-dom";
import { ProfileName } from "./ProfileName";



interface content{
title :string,
content :string,
userName:string,
id:string
}
export function PostCard( {title,content,userName,id}:content){

  
    const maxLength = 100; // Maximum length of the content before truncation
const navigate = useNavigate()
    // Function to truncate the text content if it's too long
    const truncateText = (text: string) => {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
      } else {
        return text;
      }
    };


    return  <Link to={"/article?id=" + id}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
        <div className="flex">
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
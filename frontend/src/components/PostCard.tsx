import { useNavigate } from "react-router-dom";
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


    return <div className="block">
        
<a href="#"
 onClick={()=>{navigate("/article?id=" + id)}}
  className="block w-screen p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100  ">

<ProfileName name={userName}/>
        <div className=" pt-3">
                
                <span className="font-bold font-merat text-2xl">{title}</span>
            </div>
            <div className=" ">
                <p className="font-normal text-md font-merat" >{truncateText(content)}</p>
            </div>
           
</a>

        
    </div>

}
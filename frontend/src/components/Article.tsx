// import axios from "axios";
// import { Button } from "./Button";
import { ProfileName } from "./ProfileName";
// import { useNavigate } from "react-router-dom";

interface ArticleProps {
    name: string;
    title: string;
    content: string;
    date:string,
    id:string
}

export function Article({ title, content, name ,date}: ArticleProps) {
    // const token = localStorage.getItem('token')
    // const navigate = useNavigate()
    // const handleBtn = async () => {
    //     try {
    //          await axios.delete(
    //             `https://medium-app.sahupravin960.workers.dev/api/v1/blog/rm`,
    //             {
    //                 headers: {
    //                     Authorization: 'Bearer ' + token //the token is a variable which holds the token
    //                 },
    //                 data: {
    //                     id:id
    //                 }
    //             }
    //         );
    //         navigate('/myblogs')
    //         // Handle successful deletion
    //     } catch (error) {
    //         // Handle error
    //         alert(error)
    //     }
    // };
    
    return (
        <div className="max-w-xl mx-auto px-4 dark:bg-black dark:text-white ">
            <div className="my-4 md:my-8"></div>
            <div className="flex justify-between items-center">
            <h1 className="text-3xl md:text-4xl font-merat font-semibold">{title}</h1>
            {/* <Button name="Delete" className="text-sm w-22" onclick={handleBtn} /> */}

            </div>
            <span className="text-sm font-mono ">Published at:{date}</span>
            <div className="mt-2 md:mt-4 mb-2 md:mb-4"><ProfileName name={name}/></div>
            <p className="text-sm md:text-base">{content}</p>
        </div>
    );
}

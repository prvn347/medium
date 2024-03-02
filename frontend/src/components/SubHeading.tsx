// import { usNavigate } from "react-router-dom";

interface HeadingProps {
    subheading: string;
    link?:string,
    onclick?:any // Assuming name is a string, you can change the type if necessary
}

export function SubHeading({subheading,link,onclick}:HeadingProps){

    return <div className=" font-400 font-merat text-lg py-3 ">
       {subheading} <span className="text-green-700 cursor-pointer" onClick={onclick}>{link}</span>
    </div>

}
interface HeadingProps {
    subheading: string;
    link?:string,
    onclick:any // Assuming name is a string, you can change the type if necessary
}

export function TextButton({link,onclick}:HeadingProps){

    return <div className=" font-400 font-merat text-lg py-3 px-3 ">
        <span className="text-black cursor-pointer" onClick={onclick}>{link}</span>
    </div>

}
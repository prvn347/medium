interface HeadingProps {
    subheading: string;
    link?:string,
    onclick:any ,
    className?:any// Assuming name is a string, you can change the type if necessary
}

export function TextButton({link,onclick,className}:HeadingProps){

    return <div className={" font-400 font-merat text-lg py-3 px-3 " + className}>
        <span className="text-black cursor-pointer" onClick={onclick}>{link}</span>
    </div>

}
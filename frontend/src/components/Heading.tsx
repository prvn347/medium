interface HeadingProps {
    name: string; // Assuming name is a string, you can change the type if necessary
}

export function Heading({name}:HeadingProps){


    return <div className=" font-400 font-glory text-4xl">
       {name}
    </div>

}
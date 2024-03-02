interface name{
    name:string
}
export function ProfileName({name}:name){
    return <div className="flex items-center gap-2">
         <div className="w-8 h-8 rounded-full bg-beige flex items-center justify-center">
                    <span className="text-md text-black">{name[0]}</span>
                    </div>
        <p className="text-normal font-merat text-md ">{name}</p>

    </div>

}
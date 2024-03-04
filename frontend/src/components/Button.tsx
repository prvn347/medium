

export interface name {
    name?:string,
    onclick:any,
    className?:any
}

export function Button({name,onclick,className}:name){

    return <div className="p-3">
        <button type="submit" onClick={onclick} className={"text-center rounded-3xl bg-black dark:bg-white  dark:text-black font-bold  border-1 tracking-wider text-white font-merat text-md px-6 py-2  " + className}>{name}</button>
    </div>
}
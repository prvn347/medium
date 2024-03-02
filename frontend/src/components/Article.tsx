import { ProfileName } from "./ProfileName";

interface ArticleProps {
    name: string;
    title: string;
    content: string;
}

export function Article({ title, content, name }: ArticleProps) {
    return (
        <div className="max-w-xl mx-auto px-4">
            <div className="my-4 md:my-8"></div>
            <h1 className="text-3xl md:text-4xl font-merat font-semibold">{title}</h1>
            <span className="text-sm font-mono ">Published at:</span>
            <div className="mt-2 md:mt-4 mb-2 md:mb-4"><ProfileName name={name}/></div>
            <p className="text-sm md:text-base">{content}</p>
        </div>
    );
}

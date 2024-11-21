interface Tagprops{
    content:string;
}

export default function Tag({content}:Tagprops){
    return(
        <span className="bg-zinc-400 text-white text-xs px-2 py-1 rounded">{content}</span>
    );
}
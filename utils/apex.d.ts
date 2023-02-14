import internal from "stream";

export interface Apex{
global:global
legends:legends
}

interface global{
    name: string;
    level:number;
    rank:rank
}

interface rank{
    rankName: string;
    rankImg:string;   
}
interface legends{
selected:selected;
}

interface selected{
    LegendName:string;
    ImgAssets:ImgAssets
    

}
interface ImgAssets{
    icon:string
}
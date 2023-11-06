import wordpressConfig from "../../wordpress.config"
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { ReactElement } from "react";

type WordpressPost = {
    id: number;
    date: string;
    date_gmt: string;
    guid: {
        rendered: string;
    };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
        protected: boolean;
    };
    excerpt: {
        rendered: string;
        protected: boolean;
    };
}

type WordpressPostQuery = {
    data: WordpressPost | undefined;
    isPending: boolean;
    error: any;
}

export default function useWpPost(postNum: number | string): WordpressPostQuery {

    if (typeof postNum === 'string') {
        postNum = wordpressConfig.pageMap[postNum].postNum
    }

    const wpPostQueryFunction = async () => {
        const { data } = await axios.get(
            `${wordpressConfig.domain}${wordpressConfig.postsRoute}${postNum}`,
        )
        return data
    }

    const { data, isPending, error } = useQuery<WordpressPost>({
        queryKey: [`${postNum}`], 
        queryFn: wpPostQueryFunction
    })

    return { data, isPending, error }
}
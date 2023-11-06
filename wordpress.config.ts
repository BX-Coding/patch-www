type WebsitePage = {
    category: number;
    postNum: number;
}

type WordpressConfig = {
    domain: string;
    postsRoute: string;
    pageMap: {[key: string]: WebsitePage};
}

const wordpressConfig: WordpressConfig = {
    domain: 'https://patch-ed.org',
    postsRoute: '/wp-json/wp/v2/posts/',
    pageMap: {
        'about': {
            category: 3,
            postNum: 99,
        },
    },
}

export default wordpressConfig;
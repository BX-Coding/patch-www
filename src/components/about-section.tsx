'use client';

import useWpPost from "@/hooks/useWPPost";
import parse from 'html-react-parser';

export default function AboutSection() {
    const { data, isPending } = useWpPost("about");

    if (isPending) return <p>loading...</p>;
    if (!data) return <p>no data</p>;
    if (data?.content.rendered === "") return <p>no content</p>;
    if (data?.content.rendered === undefined) return <p>undefined</p>;

    return (
        <p>{!isPending ? parse(data.content.rendered) : "loading..."}</p>
    );
}
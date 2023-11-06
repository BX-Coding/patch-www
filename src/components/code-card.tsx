"use client"

import Image from 'next/image'
import { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';

type CodeBlockProps = {
    className?: string,
    language?: string,
    code: string,
}

const CodeBlock = ({ className, language, code }: CodeBlockProps) => 
    <SyntaxHighlighter language="python">
        {code}
    </SyntaxHighlighter>

type CodeCardProps = {
    title: string,
    blockHref: string,
    code: string,
    className?: string,
}

export const CodeCard = ({ title, blockHref, code, className }: CodeCardProps) => {
    const [on, setOn] = useState(false)
    const classNames = "flex flex-col items-center h-[200px] w-[200px] justify-center p-4 mx-auto space-y-4 rounded-xl border border-blue-200 bg-accent drop-shadow-sm" + (className ? " " + className : "")


    return (
        <button className={classNames}
            onMouseOver={() => setOn(true)}
            onMouseLeave={() => setOn(false)}
        >
            <div className="flex flex-row items-center justify-center h-full">
            {!on && <Image src={blockHref} alt={code} width={100} height={100} />}
            {on && <CodeBlock
                    className="w-full h-full"
                    language="python"
                    code={code}
                />}
            </div>
            <h4 className="text-xl font-semibold tracking-tight">
                {title}
            </h4>
        </button>
    )
}
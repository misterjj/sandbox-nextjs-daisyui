import { use } from "react";
import {ArticleForm} from "@/components/ArticleForm";

interface PostPageProps{
    params: Promise<{id: string}>
}

export default function ArticlesEdit({ params }: PostPageProps) {
    const parameters = use(params);
    const { id } = parameters;

    return <ArticleForm id={id} />
}
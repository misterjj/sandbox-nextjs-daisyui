import {wrapPromise} from "@/utils/suspenseWrapper";
import {JSX} from "react";

interface FilterRendererProps {
    filterFn: () => JSX.Element | Promise<JSX.Element>;
    // Une clé unique pour le cache
    cacheKey: string;
}

export const FilterRenderer: React.FC<FilterRendererProps> = ({ filterFn, cacheKey }) => {
    const result = filterFn();

    if (result instanceof Promise) {
        // Si c'est une promesse, on la "wrapp" pour qu'elle suspende
        return wrapPromise(result, cacheKey);
    } else {
        // Sinon, on retourne directement le JSX
        return result;
    }
};
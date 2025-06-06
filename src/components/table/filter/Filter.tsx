import {Option} from "fp-ts/Option";
import {Paths} from "@/utils/Utils";

export type OnFilterChange = (value: Option<IFilterValue[]>) => void;

export interface IFilterValue {
    operator: "eq"|"gt"|"gte"|"lt"|"lte"|"like"|"in"|"notIn"
    value: string | number | string[] | number[]
}

export interface IFilter<T> {
    field: Paths<T>,
    subField?: string,
    values: IFilterValue[]
}

export interface IFilterProps {
    onFilterChange: OnFilterChange
}

export interface IFilterRef {
    reset: () => void;
}
export type OnFilterChange = (value?: IFilterValue[]) => void;

export interface IFilterValue {
    operator: "eq"|"gt"|"gte"|"lt"|"lte"|"like"|"in"|"notIn"|"isNull"|"isNotNull"|"startsWith"|"endsWith"|"contains"|"notContains"
    value: string | number | string[] | number[]
}

export interface IFilter<T> {
    field: keyof T,
    values: IFilterValue[]
}

export interface IFilterProps {
    onFilterChange: OnFilterChange
}
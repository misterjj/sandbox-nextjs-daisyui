import {IFilterProps, IFilterRef} from "@/components/table/filter/Filter";
import {forwardRef, useImperativeHandle, useMemo, useState} from "react";
import {none, some} from "fp-ts/Option";
import _ from "lodash";

interface ITextFilterProps extends IFilterProps {
    placeholder?: string
}

export const TextFilter = forwardRef<IFilterRef, ITextFilterProps>(
    ({placeholder, onFilterChange}, ref) => {
        TextFilter.displayName = "TextFilter";
        const [value, setValue] = useState("")

        useImperativeHandle(ref, () => ({
            reset: () => {
                setValue("");
                onFilterChange(none);
            }
        }));

        const updateFilter = useMemo(() => {
            return _.debounce((value: string) => {
                if (value === "") {
                    onFilterChange(none)
                    return
                }

                onFilterChange(some([{operator: "eq", value}]))
            }, 500)
        }, []);

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value
            setValue(value)
            updateFilter(value)
        }


        return <input type="text" placeholder={placeholder} value={value} className="input focus:outline-none w-full"
                      onChange={handleInputChange}/>
    })
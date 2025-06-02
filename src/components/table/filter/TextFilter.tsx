import {IFilterProps} from "@/components/table/filter/Filter";
import {useState} from "react";

interface ITextFilterProps extends IFilterProps {
    placeholder?: string
}

export function TextFilter({placeholder, onFilterChange}: ITextFilterProps) {
    const [value, setValue] = useState("")


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setValue(value)

        if (value === "") {
            onFilterChange(undefined)
            return
        }

        onFilterChange([{operator: "eq", value}])
    }


    return <input type="text" placeholder={placeholder} value={value} className="input focus:outline-none"
                  onChange={handleInputChange}/>
}
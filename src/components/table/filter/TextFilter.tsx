interface ITextFilterProps extends IFilterProps {
    placeholder?: string
}

export function TextFilter({placeholder}: ITextFilterProps) {
    return <input type="text" placeholder={placeholder} className="input focus:outline-none"/>
}
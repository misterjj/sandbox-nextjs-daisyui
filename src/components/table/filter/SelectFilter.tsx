interface ISelectFilterProps extends IFilterProps {
    options: string[];
    selectedValue?: string;
}

export function SelectFilter({ options, selectedValue }: ISelectFilterProps) {
    return (
        <select value={selectedValue} className="select focus:outline-none">
            {options.map(opt => (
                <option key={opt} value={opt}>
                    {opt}
                </option>
            ))}
        </select>
    );
}
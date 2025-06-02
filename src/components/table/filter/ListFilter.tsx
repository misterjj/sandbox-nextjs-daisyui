import {useState} from "react";
import {IFilterProps} from "@/components/table/filter/Filter";

export interface IListItem {
    id: string;
    label: string;
}

interface IListFilterProps extends IFilterProps {
    items: IListItem[];
    values: (string)[];
    allowSelectAll?: boolean;
}

// 6. Implémentation de ListFilter
export function ListFilter(
    {
        items,
        values,
        allowSelectAll = true,
    }: IListFilterProps
) {
    const [selectedItems, setSelectedItems] = useState(values)

    const handleChange = (id: string) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id))
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    const handleSelectAll = () => {
        if (selectedItems.length === items.length) {
            setSelectedItems([])
        } else {
            setSelectedItems(items.map(item => item.id))
        }
    }

    return <ul className={`ps-5`}>
        { allowSelectAll && <li>
            <label className="label">
                <input
                    type="checkbox"
                    checked={selectedItems.length === items.length}
                    onChange={handleSelectAll}
                    className="checkbox checkbox-primary checkbox-sm"/>
                Tout selectionner
            </label>
        </li> }
        {items.map((item,i) => {
            return <li key={i}>
                <label className="label">
                    <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleChange(item.id)}
                        className="checkbox checkbox-primary checkbox-sm"/>
                    {item.label}
                </label>
            </li>
        })}
    </ul>
}
import {forwardRef, useEffect, useImperativeHandle, useMemo, useState} from "react";
import {IFilterProps, IFilterRef} from "@/components/table/filter/Filter";
import {none, some} from "fp-ts/Option";
import _ from "lodash";

export interface IListItem {
    id: string;
    label: string;
}

interface IListFilterProps extends IFilterProps {
    items: IListItem[];
    values: (string)[];
    allowSelectAll?: boolean;
}


export const ListFilter = forwardRef<IFilterRef, IListFilterProps>(
    ({
         items,
         values,
         allowSelectAll = true,
         onFilterChange
     }: IListFilterProps
    , ref) => {
        ListFilter.displayName = "ListFilter";
        const [selectedItems, setSelectedItems] = useState(values)

        const handleChange = (id: string) => {
            if (selectedItems.includes(id)) {
                const newItems = selectedItems.filter(item => item !== id);
                setSelectedItems(newItems)
                updateFilter(newItems)
            } else {
                const newItems = [...selectedItems, id];
                setSelectedItems(newItems)
                updateFilter(newItems)
            }
        }

        const handleSelectAll = () => {
            if (selectedItems.length === items.length) {
                const newItems: string[] = []
                setSelectedItems(newItems)
                updateFilter(newItems)
            } else {
                const newItems = items.map(item => item.id);
                setSelectedItems(newItems)
                updateFilter(newItems)
            }
        }

        const updateFilter = useMemo(() => {
            return _.debounce((selectedItems: string[]) => {
                if (selectedItems.length === values.length || selectedItems.length === 0) {
                    onFilterChange(none)
                } else {
                    onFilterChange(some([{operator: "in", value: selectedItems}]))
                }
            }, 500)
        }, []);

        useImperativeHandle(ref, () => ({
            reset: () => {
                setSelectedItems(values);
                onFilterChange(none);
            }
        }));

        return <ul className={`ps-5`}>
            {allowSelectAll && <li>
                <label className="label">
                    <input
                        type="checkbox"
                        checked={selectedItems.length === items.length}
                        onChange={handleSelectAll}
                        className="checkbox checkbox-primary checkbox-sm"/>
                    Tout selectionner
                </label>
            </li>}
            {items.map((item, i) => {
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
    })
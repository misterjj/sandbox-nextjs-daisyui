export interface IListItem {
    id: string | number;
    label: string;
}

interface IListFilterProps extends IFilterProps {
    items: IListItem[];
    selectedItemIds: (string | number)[];
    allowSelectAll?: boolean;
}

// 6. Implémentation de ListFilter
export function ListFilter(
    {
        items,
        selectedItemIds,
        allowSelectAll = true,
    }: IListFilterProps
) {
    return <ul className={`ps-5`}>
        <li>
            <label className="label">
                <input type="checkbox" className="checkbox checkbox-primary checkbox-sm"/>
                Tout selectionner
            </label>
        </li>
        {items.map((item,i) => {
            return <li key={i}>
                <label className="label">
                    <input type="checkbox" className="checkbox checkbox-primary checkbox-sm"/>
                    {item.label}
                </label>
            </li>
        })}
    </ul>
}
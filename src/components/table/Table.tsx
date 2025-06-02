import {JSX, useEffect, useMemo, useState} from "react";

import _ from "lodash"
import {HiOutlineArrowLongDown, HiOutlineArrowLongUp} from "react-icons/hi2";
import {PaginationInline} from "@/components/table/PaginationInline";
import {HiFilter, HiOutlineFilter} from "react-icons/hi";
import {FilterWrapper} from "@/components/table/filter/FilterWrapper";
import {TextFilter} from "@/components/table/filter/TextFilter";
import {SelectFilter} from "@/components/table/filter/SelectFilter";
import {RangeFilter} from "@/components/table/filter/RangeFilter";
import {IListItem, ListFilter} from "@/components/table/filter/ListFilter";

export type ITableCallback<T> = (page: number, itemsPerPage: number, sort: ITableSort<T>, callback: (response: {
    rowTotalCount: number,
    values: T[]
}) => void) => void

export interface ITableColDef<T> {
    headerName: string,
    render: (item: T) => JSX.Element,
    sortable?: keyof T
}

export interface IFilterDef {

}

interface ITableSort<T> {
    field?: keyof T,
    order?: "asc" | "desc"
}

interface ITable<T> {
    callback: ITableCallback<T>
    colDefs: ITableColDef<T>[]
    paginationPageSize?: number
    paginationPageSizeSelector?: number[]
}

export default function Table<T>(
    {
        paginationPageSize = 10,
        paginationPageSizeSelector = [10, 20, 50, 100],
        callback,
        colDefs
    }: ITable<T>
) {
    const [rowNumber, setRowNumber] = useState(1)
    const [items, setItems] = useState<T[]>([])
    const [itemPerPage, setItemPerPage] = useState(paginationPageSize)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [sort, setSort] = useState<ITableSort<T>>({})
    const [filterOpen, setFilterOpen] = useState(false)

    const handleChangeItemPerPage = (n: number) => {
        setItemPerPage(n)
        setPage(1)
    }

    const handleChangeSort = (field: keyof T) => {
        setSort(sort => {
                if (field !== sort.field) {
                    return {
                        field,
                        order: "asc"
                    }
                }

                let order: undefined | "asc" | "desc" = undefined
                if (sort.order === undefined) {
                    order = "asc"
                } else if (sort.order === "asc") {
                    order = "desc"
                }

                return {
                    field,
                    order
                }
            }
        )
    }

    const debouncedCallback = useMemo(() => {
        return _.debounce((currentPage: number, currentItemPerPage: number, sort: ITableSort<T>) => {
            setLoading(true)
            callback(currentPage, currentItemPerPage, sort, ({rowTotalCount, values}) => {
                setRowNumber(rowTotalCount);
                setItems(values);
                setLoading(false)
            });
        }, 500);
    }, [callback]);


    const productCategories: IListItem[] = [
        { id: 'electronics', label: 'Électronique' },
        { id: 'books', label: 'Livres' },
        { id: 'clothing', label: 'Vêtements' },
        { id: 'home', label: 'Maison & Jardin' },
    ];

    useEffect(() => {
        debouncedCallback(page, itemPerPage, sort)

        return () => {
            debouncedCallback.cancel();
        };
    }, [page, itemPerPage, sort, debouncedCallback, callback]);

    return (
        <>
            <div className={`flex items-center gap-4 mb-2`}>
                <div className={"grow text-2xl font-semibold"}>Liste des articles</div>
                <PaginationInline
                    page={page}
                    pageNumber={Math.ceil(rowNumber / itemPerPage)}
                    onPageChangeCallback={(page) => setPage(page)}
                />
                <div className={`flex items-end gap-2 text-nowrap`}>
                    <span>Page size :</span>
                    <select className="select select-xs "
                            value={itemPerPage}
                            onChange={(e) => handleChangeItemPerPage(Number(e.target.value))}>
                        {paginationPageSizeSelector.map(n => {
                            return <option key={n}>{n}</option>
                        })}
                    </select>
                </div>
                <div className={`relative select-none`}>
                    <div className={`relative select-none cursor-pointer`}
                         onClick={() => setFilterOpen(o => !o)}>
                        {!filterOpen &&  <HiOutlineFilter size={20}/>}
                        {filterOpen && <HiFilter className={`text-primary`} size={20}/>}
                        <div
                            className={`bg-primary text-white text-xs rounded-full bottom-full left-full absolute w-4 h-4 flex items-center -translate-x-1/2 translate-y-1/2`}>
                            <span className={`grow text-center`}>2</span>
                        </div>
                    </div>
                    <div
                        className={`bg-base-100 rounded-box z-1 w-96 p-4 translate-y-4 border-1 border-gray-100 shadow-sm absolute top-full right-0 ${filterOpen ? "block" : "hidden"}`}>
                        <div className={`flex items-center gap-2`}>
                            <div className={"text-xl font-semibold"}>Filtres</div>
                            <div className="badge badge-primary badge-sm">2</div>
                            <div className={"grow"}></div>
                            <div className="text-primary cursor-pointer">Tout éffacer</div>
                        </div>
                        <FilterWrapper name="Nom" isOpen={true}>
                            <TextFilter placeholder={"Recherche un Article"} />
                        </FilterWrapper>
                        <FilterWrapper name="Id">
                            <TextFilter placeholder={"Recherche un Article"} />
                        </FilterWrapper>
                        <FilterWrapper name="Catégorie" isOpen={true}>
                            <ListFilter items={productCategories} selectedItemIds={[]} />
                        </FilterWrapper>
                        <FilterWrapper name="Quantité">
                            <RangeFilter
                                dots
                                min={0}
                                max={10000}
                                currentMin={0}
                                currentMax={1050}
                            />
                        </FilterWrapper>
                        <FilterWrapper name="Prix" isOpen={true}>
                            <RangeFilter
                                dots
                                min={0}
                                max={100}
                                currentMin={20}
                                currentMax={40}
                            />
                        </FilterWrapper>
                    </div>
                </div>
            </div>
            <div className={"w-full min-h-36 relative overflow-hidden"}>
                {loading && <div className={`absolute top-0 left-0 w-full h-full bg-black/30 z-40`}>
                    <span
                        className={`absolute left-1/2 top-18 -translate-x-1/2 bg-white px-2 rounded`}>chargement</span>
                </div>}
                <table className="table">
                    <thead>
                    <tr>
                        {colDefs.map((col, i) => {
                            return <th key={i}
                                       className={`${col.sortable !== undefined ? "cursor-pointer select-none" : ""}`}
                                       onClick={() => col.sortable !== undefined ? handleChangeSort(col.sortable) : ''}>
                                <div className={`flex items-center`}>
                                    <span>{col.headerName}</span>
                                    {col.sortable !== undefined && col.sortable === sort.field && sort.order === "asc" &&
                                        <HiOutlineArrowLongDown/>}
                                    {col.sortable !== undefined && col.sortable === sort.field && sort.order === "desc" &&
                                        <HiOutlineArrowLongUp/>}
                                </div>
                            </th>
                        })}
                    </tr>
                    </thead>
                    <tbody>
                    {items.map((t, i) => <tr key={i}>{colDefs.map((col, j) => <td key={j}>{col.render(t)}</td>)}</tr>)}
                    </tbody>
                </table>
            </div>
        </>
    )
}
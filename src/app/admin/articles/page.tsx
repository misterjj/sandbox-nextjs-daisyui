"use client"

import {listProducts, Product} from "@/sdk/product/productApi";
import {useAuth} from "@/contexts/AuthContext";
import {RefObject, useCallback, useMemo} from "react";
import Table, {IFilterDef, IFilterRefs, ITableCallback, ITableColDef} from "@/components/table/Table";
import Link from "next/link";
import {HiOutlineTag} from "react-icons/hi";
import {TextFilter} from "@/components/table/filter/TextFilter";
import {IListItem, ListFilter} from "@/components/table/filter/ListFilter";
import {RangeFilter} from "@/components/table/filter/RangeFilter";
import {IFilterRef, OnFilterChange} from "@/components/table/filter/Filter";
import {ChoicesFilter, IChoiceItem} from "@/components/table/filter/ChoicesFilter";

export default function Articles() {
    const {token} = useAuth();

    const listProductsCallback = useCallback<ITableCallback<Product>>((page, itemsPerPage, sort, callback) => {
        if (!token) return;

        listProducts({
            page,
            perPage: itemsPerPage,
            sort: sort.field === undefined || sort.order === undefined ? undefined : {
                field: sort.field,
                order: sort.order
            },
            token
        }).then(data => callback({rowTotalCount: data.count, values: data.values}))
    }, [token]);

    const colDefs = useMemo<ITableColDef<Product>[]>(() => {
        return [
            {
                headerName: "#",
                render: (item) => <Link href={`/admin/articles/${item.id}`}>{item.id}</Link>,
                sortable: "id"
            },
            {
                headerName: "Produit",
                render: (item) => <Link href={`/admin/articles/${item.id}`} className={`flex items-center gap-2`}>
                    <div className={`bg-gray-300 border-primary border rounded w-18 h-18`}></div>
                    <div className={`flex flex-col`}>
                        <div className={`font-bold`}>{item.nameFr}</div>
                        <div className={`flex items-center gap-1`}>{item.categories.map((cat, i) => {
                                return <div key={i} className="badge badge-neutral badge-soft gap-1">
                                    <HiOutlineTag size={12}/>
                                    {cat.nameFr}
                                </div>
                            }
                        )}</div>
                    </div>
                </Link>
            },
            {
                headerName: "Quantité",
                render: (item) => <>{item.stock}</>,
                sortable: "stock"
            },
            {
                headerName: "Prix",
                render: (item) => <span className={`text-success`}>{item.price} €</span>,
                sortable: "price"
            },
        ]
    }, []);


    const productStatus: IListItem[] = [
        {id: 'online', label: 'En ligne'},
        {id: 'draft', label: 'Brouillon'},
        {id: 'offline', label: 'Hors ligne'},
    ];

    const productCategories = useMemo<IChoiceItem[]>(() => {
        return [
            {value: "1", label: "Dofus"},
            {value: "2", label: "Wakfu"},
            {value: "3", label: "Dofus touch"},
        ]
    }, []);

    const initRef = (idx: number, ref: RefObject<IFilterRefs>, el: IFilterRef | null): void => {
        if (null !== el) {
            ref.current.refs[idx] = el
        }
    }

    const filterDefs = useMemo<IFilterDef<Product>[]>(() => {
        return [
            {
                field: "nameFr",
                id: "name",
                label: "Nom",
                filter: (onFilterChange: OnFilterChange, ref: RefObject<IFilterRefs>, idx: number) =>
                    <TextFilter
                        ref={el => initRef(idx, ref, el)}
                        placeholder={"Recherche un Article"} onFilterChange={onFilterChange}
                    />,
                open: true
            },
            {
                field: "id",
                id: "id",
                label: "Id",
                filter: (onFilterChange: OnFilterChange, ref: RefObject<IFilterRefs>, idx: number) =>
                    <TextFilter ref={el => initRef(idx, ref, el)} placeholder={"Recherche un Id"}
                                onFilterChange={onFilterChange}/>
            },
            {
                field: "categories",
                id: "status",
                label: "Statut",
                filter: (onFilterChange: OnFilterChange, ref: RefObject<IFilterRefs>, idx: number) =>
                    <ListFilter ref={el => initRef(idx, ref, el)}
                                items={productStatus} values={productStatus.map(c => c.id)}
                                onFilterChange={onFilterChange}
                    />,
                open: true
            },
            {
                field: "categories",
                id: "category",
                label: "Catégorie",
                filter: (onFilterChange: OnFilterChange, ref: RefObject<IFilterRefs>, idx: number) =>
                    <ChoicesFilter ref={el => initRef(idx, ref, el)}
                                   multiple={true}
                                   choices={productCategories}
                                   onFilterChange={onFilterChange}
                    />,
                open: true
            },
            {
                field: "stock",
                id: "quantity",
                label: "Quantité",
                filter: (onFilterChange: OnFilterChange, ref: RefObject<IFilterRefs>, idx: number) => <RangeFilter
                    ref={el => initRef(idx, ref, el)}
                    min={0}
                    max={1000}
                    defaultMin={0}
                    defaultMax={1000}
                    onFilterChange={onFilterChange}
                />
            },
            {
                field: "price",
                id: "price",
                label: "Prix",
                filter: (onFilterChange: OnFilterChange, ref: RefObject<IFilterRefs>, idx: number) => <RangeFilter
                    ref={el => initRef(idx, ref, el)}
                    dots
                    min={0}
                    max={100}
                    defaultMin={0}
                    defaultMax={100}
                    onFilterChange={onFilterChange}
                />,
                open: true
            }
        ]
    }, []);

    const TableMemo = useCallback(() => {
        return <Table<Product> callback={listProductsCallback} colDefs={colDefs} filterDefs={filterDefs}/>
    }, [listProductsCallback, colDefs, filterDefs])

    return (
        <div className={"mb-10"}>
            <TableMemo/>
        </div>
    );
}
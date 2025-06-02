"use client"

import {listProducts, Product} from "@/sdk/product/productApi";
import {useAuth} from "@/contexts/AuthContext";
import {useCallback, useState} from "react";
import Table, {ITableCallback, ITableColDef} from "@/components/table/Table";
import Link from "next/link";
import {HiOutlineTag} from "react-icons/hi";


export default function Articles() {
    const {token} = useAuth();
    const [products, setProducts] = useState<Product[]>([]);

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

    const colDefs: ITableColDef<Product>[] = [
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

    const TableMemo = useCallback(() => {
        return <Table<Product> callback={listProductsCallback} colDefs={colDefs}/>
    }, [products])

    return (
        <div className={"mb-10"}>
            <TableMemo/>
        </div>
    );
}
"use client"

import {listProducts, Product} from "@/sdk/product/productApi";
import {useAuth} from "@/contexts/AuthContext";
import {useEffect, useState} from "react";


export default function Articles() {
    const {token} = useAuth();
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        if (!token) return;

        listProducts({
            page: 0,
            perPage: 10,
            token
        }).then(data => {
            setProducts(data.values)
        })
    }, [token])

    return (
        <div>
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                <table className="table">
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Stock</th>
                        <th>Prix</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map(product => (<tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.nameFr}</td>
                            <td>{product.stock}</td>
                            <td>{product.price}</td>
                        </tr>))}
                    </tbody>
                </table>
            </div>
            <div className="join">
                <button className="join-item btn">1</button>
                <button className="join-item btn btn-active">2</button>
                <button className="join-item btn">3</button>
                <button className="join-item btn">4</button>
            </div>
        </div>
    );
}
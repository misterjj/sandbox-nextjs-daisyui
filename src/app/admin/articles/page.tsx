"use client"

import {AllCommunityModule, ColDef, ModuleRegistry, GridReadyEvent, PaginationChangedEvent} from 'ag-grid-community';
import {AgGridReact} from 'ag-grid-react';
import {useEffect, useState, useCallback} from "react";
import {Product, ProductApi} from "@/generated/sdk";
import {useAuth} from "@/contexts/AuthContext";

ModuleRegistry.registerModules([AllCommunityModule]);

export default function Articles() {
    const {token} = useAuth()
    const [rowData, setRowData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10; // Définir la taille de page

    const productApi = new ProductApi();

    const loadData = useCallback(async (page: number) => {
        setLoading(true);
        try {
            const response = await productApi.apiProductsGetCollection(
                {page: page},
                {headers: {"Authorization": "Bearer " + token}}
            );

            // Supposant que votre API retourne un objet avec les données et le total
            // Ajustez selon la structure de votre réponse API
            if (Array.isArray(response)) {
                setRowData(response);
                setTotalCount(response.length); // Si pas de total disponible
            } else {
                // Si votre API retourne {data: Product[], total: number}
                setRowData(response.data || response);
                setTotalCount(response.total || response['hydra:totalItems'] || 0);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            setRowData([]);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            loadData(currentPage);
        }
    }, [loadData, currentPage, token]);

    const onPaginationChanged = useCallback((event: PaginationChangedEvent) => {
        const newPage = event.api.paginationGetCurrentPage() + 1; // AG-Grid commence à 0
        if (newPage !== currentPage) {
            setCurrentPage(newPage);
        }
    }, [currentPage]);

    const colDefs: ColDef<Product>[] = [
        {
            field: 'id',
            headerName: 'ID'
        },
        {
            field: 'price',
            headerName: 'Prix'
        },
        {
            field: 'stock',
            headerName: 'Stock'
        },
        {
            field: 'nameFr',
            headerName: 'Nom (FR)'
        }
    ];

    // https://www.ag-grid.com/javascript-data-grid/infinite-scrolling/#example-2-equal-pagination-page-size-and-large-infinite-block-size

    return (
        <div>
            <div style={{height: 500}}>
                <AgGridReact<Product>
                    rowData={rowData}
                    columnDefs={colDefs}
                    pagination={true}
                    paginationPageSize={pageSize}
                    paginationPageSizeSelector={[10, 20, 50]}
                    loading={loading}
                    onPaginationChanged={onPaginationChanged}
                    suppressPaginationPanel={false}
                    pivotRowTotals={"after"}
                />
            </div>
        </div>
    );
}
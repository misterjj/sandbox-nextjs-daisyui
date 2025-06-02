import {useCallback, useEffect, useState} from "react";
import {
    HiOutlineChevronDoubleLeft,
    HiOutlineChevronDoubleRight,
    HiOutlineChevronLeft,
    HiOutlineChevronRight
} from "react-icons/hi";

interface IPaginationInline {
    page: number
    pageNumber: number,
    onPageChangeCallback?: (page: number) => void
}

export function PaginationInline(
    {
        page,
        pageNumber,
        onPageChangeCallback = (_) => {
        }
    }: IPaginationInline
) {
    const [currentPage, setCurrentPage] = useState(page)

    useEffect(() => {
        if (currentPage !== page) {
            setCurrentPage(page);
        }
    }, [page])

    const goTo = useCallback((goto: number) => {
        if (goto <= 1) {
            setCurrentPage(1)
            onPageChangeCallback(1)
            return
        }

        if (goto >= pageNumber) {
            setCurrentPage(pageNumber)
            onPageChangeCallback(pageNumber)
            return
        }

        setCurrentPage(goto)
        onPageChangeCallback(goto)
        return
    }, [currentPage, pageNumber, page])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        if (value === '' || /^\d+$/.test(value)) {
            const numValue = value === '' ? 1 : parseInt(value)
            setCurrentPage(numValue)
        }
    }

    const handleInputBlur = () => {
        goTo(currentPage)
    }

    const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.select()
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            goTo(currentPage)
            e.currentTarget.blur()
        }
    }

    return (
        <div className={`flex items-center`}>
            <button className={`p-1 ${currentPage <= 1 ? "text-gray-300" : "cursor-pointer"}`} onClick={() => goTo(1)}>
                <HiOutlineChevronDoubleLeft size={15}/></button>
            <button className={`p-1 ${currentPage <= 1 ? "text-gray-300" : "cursor-pointer"}`}
                    onClick={() => goTo(currentPage - 1)}><HiOutlineChevronLeft size={15}/></button>
            <div className={`flex items-center gap-2`}>
                <span>Page</span>
                <input type="text"
                       value={currentPage}
                       onChange={handleInputChange}
                       onBlur={handleInputBlur}
                       onKeyUp={handleKeyPress}
                       onFocus={handleInputFocus}
                       className={`w-6 text-center outline-none cursor-pointer`}/>
                <span>sur</span>
                {pageNumber}
            </div>
            <button className={`p-1 ${currentPage >= pageNumber ? "text-gray-300" : "cursor-pointer"}`}
                    onClick={() => goTo(currentPage + 1)}><HiOutlineChevronRight size={15}/></button>
            <button className={`p-1 ${currentPage >= pageNumber ? "text-gray-300" : "cursor-pointer"}`}
                    onClick={() => goTo(pageNumber)}><HiOutlineChevronDoubleRight size={15}/></button>
        </div>
    )
}
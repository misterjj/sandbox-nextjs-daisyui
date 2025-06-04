import {useEffect, useRef, useState} from "react";
import {HiOutlineChevronDown} from "react-icons/hi";
import {IFilterProps} from "@/components/table/filter/Filter";

interface IFilterWrapperProps<T extends React.ReactElement<IFilterProps>> {
    label: string
    children: T
    isOpen?: boolean,
    isPanelOpen?: boolean,
    active?: boolean
}

export function FilterWrapper<T extends React.ReactElement<IFilterProps>>(
    {
        label,
        children,
        isOpen = false,
        active = false,
        isPanelOpen = false
    }: IFilterWrapperProps<T>
) {
    const [open, setOpen] = useState(isOpen);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    const contentId = `filter-content-${label.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        <div className={`flex flex-col`}>
            <div
                className={`cursor-pointer flex items-center gap-1`}
                onClick={() => setOpen(o => !o)}
                aria-expanded={open}
                aria-controls={contentId}
            >
                <HiOutlineChevronDown
                    size={15}
                    className={`transition-transform duration-300 ease-in-out ${
                        !open ? "rotate-0" : "rotate-180"
                    }`}
                />
                <span className={`font-semibold py-2`}>{label}</span>
                {active && <div aria-label="status" className="status status-primary"></div>}
            </div>
            <div ref={contentRef} className={`${open ? 'block': 'hidden'}`} id={contentId}>
                {children}
            </div>
        </div>
    );
}
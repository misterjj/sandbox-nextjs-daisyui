import {  useRef, useState, useEffect } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

interface IFilterWrapperProps<T extends React.ReactElement<IFilterProps>> {
    name: string;
    children: T;
    isOpen?: boolean;
}

export function FilterWrapper<T extends React.ReactElement<IFilterProps>>({ name, children, isOpen = false }: IFilterWrapperProps<T>) {
    const [open, setOpen] = useState(isOpen);
    const [currentMaxHeight, setCurrentMaxHeight] = useState("0px");
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setOpen(isOpen);
    }, [isOpen]);

    useEffect(() => {
        if (contentRef.current) {
            if (open) {
                setCurrentMaxHeight(`${contentRef.current.scrollHeight}px`);
            } else {
                setCurrentMaxHeight("0px");
            }
        }

    }, [open, children, contentRef.current]);


    // Style pour l'animation
    const contentStyle = {
        maxHeight: currentMaxHeight,
        transition: "max-height 0.3s ease-in-out",
        overflow: "hidden",
    };

    const contentId = `filter-content-${name.replace(/\s+/g, '-').toLowerCase()}`;

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
                <span className={`font-semibold py-2`}>{name}</span>
            </div>
            <div ref={contentRef} style={contentStyle} id={contentId}>
                {children}
            </div>
        </div>
    );
}
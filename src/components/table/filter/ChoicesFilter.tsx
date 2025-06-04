import {IFilterProps, IFilterRef} from "./Filter";
import {ChoicesWrapper, IChoicesWrapperRef} from "@/components/ChoicesWrapper";
import {Options} from "choices.js";
import {ChangeEvent, forwardRef, useImperativeHandle, useMemo, useRef} from "react";
import {none, some} from "fp-ts/Option";
import _ from "lodash";

export interface IChoiceItem {
    value: string,
    label: string
}

interface IChoicesFilterProps extends IFilterProps {
    choices: IChoiceItem[],
    multiple?: boolean,
}

export const ChoicesFilter = forwardRef<IFilterRef, IChoicesFilterProps>(
    ({choices, multiple, onFilterChange}: IChoicesFilterProps, fRef) => {
        ChoicesFilter.displayName = "ChoicesFilter";
        const ref = useRef<IChoicesWrapperRef>(null);

        const options = useMemo<Partial<Options>>(() => {
            return {
                choices,
                removeItemButton: true
            }
        }, [choices]);

        useImperativeHandle(fRef, () => ({
            reset: () => {
                ref.current?.reset()
                onFilterChange(none);
            }
        }));

        const updateFilter = useMemo(() => {
            return _.debounce((values: string[]) => {
                if (values.length === 0 || values.length === choices.length) {
                    return onFilterChange(none)
                }

                onFilterChange(some([{operator: "in", value: values}]))
            }, 1000)
        }, [choices, onFilterChange]);

        const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
            const values = e.target.querySelectorAll<HTMLOptionElement>("option[selected]").values().toArray().map(opt => opt.value)

            updateFilter(values)
        }

        return (
            <ChoicesWrapper
                ref={ref}
                multiple={multiple}
                options={options}
                onChange={onChange}
            />
        );
    })
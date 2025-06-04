import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import * as React from "react";
import {forwardRef, useImperativeHandle, useMemo, useState} from "react";
import type {MarkObj} from "rc-slider/lib/Marks";
import _, {isArray} from "lodash";
import {IFilterProps, IFilterRef} from "@/components/table/filter/Filter";
import {none, some} from "fp-ts/Option";


interface IRangeFilterProps extends IFilterProps {
    min: number
    max: number
    defaultMin: number
    defaultMax: number
    step?: number
    dots?: boolean
}

const ALLOWED_STEPS = [1, 5, 10, 20, 25, 50, 100, 500, 1000];
const TARGET_NUMBER_OF_STEPS = 10;

export const RangeFilter = forwardRef<IFilterRef, IRangeFilterProps>(
    ({
         min,
         max,
         defaultMin,
         defaultMax,
         step,
         dots = false,
         onFilterChange
     }: IRangeFilterProps
        , ref) => {
        RangeFilter.displayName = "RangeFilter";
        const toObject = (values: number[]): Record<string | number, React.ReactNode | MarkObj> => {
            return values.reduce<Record<string | number, React.ReactNode | MarkObj>>((acc, value) => {
                acc[value] = value;
                return acc
            }, {})
        };

        const [currentMin, setCurrentMin] = useState(defaultMin)
        const [currentMax, setCurrentMax] = useState(defaultMax)
        const [marks, setMarks] = useState<Record<string | number, React.ReactNode | MarkObj>>(toObject([currentMin, defaultMax]))


        const updateFilter = useMemo(() => {
            return _.debounce((valueMin: number, valueMax: number) => {
                if (valueMin === min && valueMax === max) {
                    return onFilterChange(none)
                }

                onFilterChange(some([{operator: "gte", value: valueMin}, {operator: "lte", value: valueMax}]))
            }, 500)
        }, []);

        const handleChange = (value: number | number[]) => {
            if (isArray(value) && value.length === 2) {
                setMarks(toObject(value))

                const valueMin = value[0]
                const valueMax = value[1]

                setCurrentMin(valueMin)
                setCurrentMax(valueMax)

                updateFilter(valueMin, valueMax)
            }
        }

        useImperativeHandle(ref, () => ({
            reset: () => {
                setMarks(toObject([defaultMin, max]))
                setCurrentMin(defaultMin)
                setCurrentMax(defaultMax)
                onFilterChange(none);
            }
        }));

        const effectiveStep = React.useMemo(() => {
            if (step !== undefined) {
                return step;
            }

            const range = max - min;
            if (range <= 0) {
                return 1;
            }

            if (ALLOWED_STEPS.length === 0) {
                return 1;
            }

            const idealStep = range / TARGET_NUMBER_OF_STEPS;

            let bestStep = ALLOWED_STEPS[0];
            let minDifference = Math.abs(ALLOWED_STEPS[0] - idealStep);

            for (let i = 1; i < ALLOWED_STEPS.length; i++) {
                const currentAllowedStep = ALLOWED_STEPS[i];
                const currentDifference = Math.abs(currentAllowedStep - idealStep);

                if (currentDifference <= minDifference) {
                    minDifference = currentDifference;
                    bestStep = currentAllowedStep;
                }
            }
            return bestStep;

        }, [min, max, step]);

        return <div className={"px-4 h-12"}>
            <Slider range dots={dots} value={[currentMin, currentMax]} step={effectiveStep} min={min} max={max}
                    pushable={true}
                    allowCross={false} marks={marks} onChange={handleChange}/>
        </div>
    }
)
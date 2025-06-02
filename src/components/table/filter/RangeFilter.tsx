import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import {useState} from "react";
import * as React from "react";
import type {MarkObj} from "rc-slider/lib/Marks";
import {isArray} from "lodash";


interface IRangeFilterProps extends IFilterProps {
    min: number
    max: number
    currentMin: number
    currentMax: number
    step?: number
    dots?: boolean
}

const ALLOWED_STEPS = [1, 5, 10, 20, 25, 50, 100, 500, 1000];
const TARGET_NUMBER_OF_STEPS = 10;

export function RangeFilter(
    {
        min,
        max,
        currentMin,
        currentMax,
        step,
        dots = false
    }: IRangeFilterProps
) {
    const toObject = (values: number[]): Record<string | number, React.ReactNode | MarkObj> => {
        return values.reduce<Record<string | number, React.ReactNode | MarkObj>>((acc, value) => {
            acc[value] = value;
            return acc
        }, {})
    };

    const [marks, setMarks] = useState<Record<string | number, React.ReactNode | MarkObj>>(toObject([currentMin, currentMax]))


    const handleChange = (value: number | number[]) => {
        if (isArray(value)) {
            setMarks(toObject(value))
        }
    }

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
        <Slider range dots={dots} defaultValue={[currentMin, currentMax]} step={effectiveStep} min={min} max={max} pushable={true}
                   allowCross={false} marks={marks} onChange={handleChange}/>
    </div>
}
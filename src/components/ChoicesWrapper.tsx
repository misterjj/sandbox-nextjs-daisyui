import { ChangeEvent, forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import ChoicesLib, { Options } from "choices.js";
import 'choices.js/public/assets/styles/choices.min.css';

interface IChoices {
    options: Partial<Options>;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    multiple?: boolean;
}

export interface IChoicesWrapperRef {
    reset: () => void
}

export const ChoicesWrapper = forwardRef<IChoicesWrapperRef, IChoices>(
    ({
         options,
         onChange,
         multiple
     }: IChoices, fRef) => {
        ChoicesWrapper.displayName = "ChoicesWrapper";
        const selectRef = useRef<HTMLSelectElement>(null);
        const [choicesInstance, setChoicesInstance] = useState<ChoicesLib | null>(null);

        useImperativeHandle(fRef, () => ({
            reset: () => {
                if (choicesInstance) {
                    choicesInstance.removeActiveItems()
                }
            }
        }));

        useEffect(() => {
            if (selectRef.current) {
                selectRef.current.innerHTML = '';
                const newInstance = new ChoicesLib(selectRef.current, options);
                setChoicesInstance(newInstance);

                return () => {
                    if (newInstance) {
                        newInstance.destroy();
                    }
                    setChoicesInstance(null)
                };
            }
        }, [options]);

        return (
            <select multiple={multiple} ref={selectRef} onChange={onChange}></select>
        );
    }
);
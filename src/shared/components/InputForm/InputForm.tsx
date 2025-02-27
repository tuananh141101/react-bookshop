import React from "react";
import { invalidCharsRegex } from "../../../common/utils/Utils";

interface IProps {
    value: any;
    onChange?: any;
    isBorderError?: any;
    isError?: any;
    type?: any;
    disabled?: any;
    noTextErr?: boolean;
    placeholder?: string;
    className?: string;
    maxLength?: number;
    onKeyDown?: () => void;
    onKeyPress?: boolean;
    suffix?: string;
    style?: any;
    id?: string;
}

const InputForm = (item: IProps) => {
    return (
        <>
            <input
                type={item.type ?? "text"}
                value={item.value || ""}
                style={item.style}
                placeholder={item.placeholder ?? ""}
                className={item.className}
                id={item.id}
                onKeyDown={(e: any) => {
                    if (e.key === "Enter" && !item.loadingAction) {
                        item.onKeyDown && item.onKeyDown();
                    }
                }}
                maxLength={item.maxLength ?? 200}
                onChange={(e:any) => {
                    item.onChange(e)
                }}
            />
        </>
    );
};

export default InputForm;

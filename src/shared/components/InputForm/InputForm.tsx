import React from "react";

interface IProps {
    value: unknown;
    onChange?: unknown;
    isBorderError?: unknown;
    isError?: unknown;
    type?: unknown;
    disabled?: unknown;
    noTextErr?: boolean;
    placeholder?: string;
    className?: string;
    maxLength?: number;
    onKeyDown?: () => void;
    onKeyPress?: boolean;
    suffix?: string;
    style?: unknown;
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
                    if (e.key === "Enter") {
                        item.onKeyDown && item.onKeyDown();
                    }
                }}
                maxLength={item.maxLength ?? 200}
                onChange={(e:any) => {
                    item.onChange?.(e)
                }}
            />
        </>
    );
};

export default InputForm;

import React from 'react'


interface IProps {
    value: any;
    onChange?: any;
    isBorderError?: any;
    isError?: any;
    disabled?: any;
    noTextErr?: boolean;
    placeholder?: string;
    className?: string;
    maxLength?: number;
    onKeyDown?: () => void;
    suffix?: string;
    style?: any;
    id?: string;
    rows?: number;
    cols?: number;
    spellcheck?: boolean; //Kiểm tra lỗi chính tả
}

const TextArea = (item: IProps) => {
  return (
    <textarea
        value={item.value || ""}
        style={item.style}
        placeholder={item.placeholder ?? ""}
        className={item.className}
        id={item.id}
        onKeyDown={(e: any) => {
            if (e.key === "Enter" && !item.loadingAction) {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                item.onKeyDown && item.onKeyDown();
            }
        }}
        maxLength={item.maxLength ?? 200}
        onChange={(e:any) => {
            item.onChange(e)
        }}
        cols={item.col}
        rows={item.rows}
    />
  )
}

export default TextArea
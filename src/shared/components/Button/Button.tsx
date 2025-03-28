import React from "react";

interface IProps {
    onChange?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties; // Sử dụng kiểu của React cho style
    text: string;
    type?: "button" | "submit" | "reset";
}

const Button = (item: IProps) => {
    return (
        <>
            <button
                type={item.type ?? "submit"}
                style={{ ...item.style }}
                onClick={(e: any) => {
                    item.onChange(e);
                }}
                disabled={item.disabled}
                className={item.className}
            >
                {item.text}
            </button>
        </>
    );
};

export default Button;

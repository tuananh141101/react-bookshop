import React from "react";
import "./Navtab.scss";


export interface ISelectTabItem {
    id: string;
    value: string;
    name: string;
    isHide?: boolean;
    checked: string;
}

interface IProps {
    className?: string;
    height?: number;
    options: ISelectTabItem[];
    isBorderBottom?: boolean;
    handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Navbar: React.FC<IProps> = React.memo(
    ({
        className,
        options,
        isBorderBottom = false,
        handleRadioChange,
        height,
    }: IProps) => {
        return (
            <div
                className={`container_tabs ${
                    isBorderBottom ? "border_bottom" : ""
                } ${className}`}
            >
                <div className="tabs">
                    {options &&
                        options?.map((item) => (
                            <React.Fragment key={item.id}>
                                <input
                                    type="radio"
                                    id={`radio-${item.id}`}
                                    onChange={handleRadioChange}
                                    value={item.value}
                                    name="tabs"
                                    checked={item.checked === item.value}
                                />
                                <label
                                    className={`tab_product ${
                                        item.checked === item.value
                                            ? "tab_active"
                                            : ""
                                    }`}
                                    style={{
                                        height: height ? `${height}px` : "40px",
                                        width: `${
                                            100 /
                                            options?.filter(
                                                (i: any) => !i.isHide
                                            )?.length
                                        }%`,
                                        color:
                                            item.checked === item.value
                                                ? Constants.COLOR_DEFAULT
                                                : "",
                                    }}
                                    htmlFor={`radio-${item.id}`}
                                >
                                    {item.name}
                                </label>
                            </React.Fragment>
                        ))}
                    <span
                        style={{
                            width: `${
                                100 /
                                options?.filter((i: any) => !i.isHide)?.length
                            }%`,
                            transform: `translateX(${
                                options
                                    ?.filter((i: any) => !i.isHide)
                                    ?.findIndex(
                                        (item: any) =>
                                            item.checked === item.value
                                    ) * 100
                            }%)`,
                        }}
                        className="glider"
                    ></span>
                </div>
            </div>
        );
    }
);

export default Navbar
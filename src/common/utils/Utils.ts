class Utils {
    /**
     *
     * @param amount
     * @param currency không bắt buộc
     * @description Format giá trị thành tiền. Ví dụ: 10000 -> 10.000 đ
     */
    public formatCurrency(amount: number, currency?: string): string {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: currency ? currency : 'VND',
            minimumFractionDigits: 0,
        });
        return formatter.format(amount);
    }

    /**
     *
     * @param text
     * @description Slug . Ví dụ: Danh mục sản phẩm -> danh-muc-san-pham
     */
    public convertToSlug(text: string) {
        return text.toString()
            .toLowerCase()
            .replace(/ /g, "-")
            .replace(/[^\w-]+/g, "");
    }
}
export const utils = new Utils();

export function invalidCharsRegex (text:any) {
    const pattern = /[~!@#$%^&*()_+:"?><{}[\]|\\]/;
    return pattern.test(text.trim(''))
}

export function validateEmail(email: any) {
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    return pattern.test(email.trim(''))
}


export function checkPhoneNumber(phoneNumber: string) {
    const phoneRegex = /^(0?)(3[2-9]|5[2|6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/
    return phoneRegex.test(phoneNumber)
}

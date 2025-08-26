import * as Yup from 'yup';
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

const noSpecialCharsRegex = /^[^<>(){}[\]`\/!@#$%^&*~"'.,:?|\\]+$/;
const noOnlySpacesTest = (value:any) => value && value.trim().length > 0;
export const yupFields = {
    // @param {string} fieldNameTên hiển thị của trường để báo lỗi.
    search: Yup.string()
        .max(100, "Max length")
        .required("Search field is required")
        .matches(noSpecialCharsRegex, "Cannot contain special characters")
        .test(
            "no-only-spaces",
            'The search keyword cannot contain only whitespace',
            noOnlySpacesTest
        ),
    name: (fieldName = "Name") => Yup.string()
        .min(2, `${fieldName} is too short!`)
        .max(50, `${fieldName} is too long!`)
        .matches(noSpecialCharsRegex, `${fieldName} cannot contain special characters`)
        .test(
            "no-only-spaces",
            `${fieldName} cannot contain only whitespace`,
            noOnlySpacesTest
        )
        .required(`${fieldName} is required`),
    password: Yup.string()
        .min(5, 'Password must be at least 5 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), undefined ], 'Passwords must match')
        .required('Confirm Password is required'),
    email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    phone: Yup.number()
        .typeError("Age must be a number!")
        .min(9,"Must be at least 9")
        .max(11, "Must be less than 11 numbers")
        .required("Phone is required!")
}
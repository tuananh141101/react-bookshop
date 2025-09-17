export default class Constants {
    public static TOKEN_EXPIRE_DAYS: number =  7;
    public static TOKEN_NAME: string = "bookshop-eco-token";
    public static REFRESH_TOKEN: string = "bookshop-eco-token";
}
// Animation Framer Motion Button
export const btnAnimation = {
    hidden: {
        y: 0,
    },
    show: {
        y: -5,
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
    },
    exit: {
        y: 0,
    },
};

// Animation Framer Motion Button with Background
export const btnAnimationBG = {
    hidden: {
        y: 0,
        background: "#F6F5F3",
        color: "#19110b",
    },
    show: {
        y: -5,
        background: "#161619",
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
    },
    exit: {
        y: 0,
    },
};
export const btnAnimationBGBlacktoWhite = {
    hidden: {
        y: 0,
        background: "#19110b",
        color: "#FFFFFF",
    },
    show: {
        y: -5,
        background: "white",
        border: "1px solid #19110b",
        color: "#19110b",
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
    },
    exit: {
        y: 0,
    },
};

// Messages
export const Messages = {
    AUTH: {
        LOGIN_SUCCESS: "Login successful!",
        LOGIN_FAILED: "Invalid username or password.",
        REGISTER_SUCCESS: "Account created successfully!",
        REGISTER_FAILED: "Registration failed. Please try again.",
    },
    CART: {
        ITEM_ADDED: "Book added to cart.",
        ITEM_REMOVED: "Book removed from cart.",
        EMPTY_CART: "Your cart is currently empty.",
    },
    ORDER: {
        ORDER_PLACED: "Your order has been placed successfully.",
        ORDER_FAILED: "Failed to place the order. Please try again.",
    },
    VALIDATION: {
        REQUIRED_FIELD: "This field is required.",
        INVALID_EMAIL: "Please enter a valid email address.",
        PASSWORD_MISMATCH: "Passwords do not match.",
    },
};

// Type Item
export type typeProduct = {
    id: number;
    name: string;
    description: string;
    price: string;
    yearpublished: string;
    pages: number;
    language: string;
    author: string;
    categories: string[];
    image: string;
    sale: boolean;
    quantity: number;
};
export type typeProductInCart = {
    id: number;
    name: string;
    price: string;
    image: string;
    quantity: number;

}
export type typePagination = {
    currentPage: number;
    limit: number;
    totalPages: number;
    totalItems: number;
}
export type typeBlog = {
    id: number;
    title: string;
    content: string;
    date: string;
    categories: string[];
    image: string;
    section?: Array<[]>;
};
export type typePost = {
    id: number;
    title: string;
    author: string;
    content: string;
    date: string;
};
export type typeComment = {
    id: string; // ID của comment
    productId: string; // ID của sản phẩm
    name: string; // Tên người comment
    email: string; // Email người comment
    content: string; // Nội dung comment
    replies: typeReply[]; // Danh sách reply
    createdAt: string; // Thời gian tạo comment
    type: string; // Kiểu của cmt blog&product
  
};
export type typeReply = {
    id: string; // ID của reply
    commentId: string; // ID của comment mà reply thuộc về
    name: string; // Tên người reply
    email: string; // Email người reply
    content: string; // Nội dung reply
    createdAt: string; // Thời gian tạo reply
};
export type typeCategories = {
    id: number;
    name: string;
    image: string;
};
export type typeListCategories = {
    id:number;
    name:string;
}
export type typeListAuthor = {
    id: number;
    name:string;
}
// Validate email
export const valiEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
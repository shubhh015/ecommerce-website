export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

export const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;

export const phoneRegex = /^(?:\+91|91|0)?[789]\d{9}$/;

export const validateEmail = (email) => {
    return emailRegex.test(email);
};

export const validatePassword = (password) => {
    return passwordRegex.test(password);
};

export const validateUsername = (username) => {
    return usernameRegex.test(username);
};

export const validatePhone = (phone) => {
    return phoneRegex.test(phone);
};

export const getPasswordHelperMessage = (password) => {
    if (password.length === 0) {
        return "Password is required.";
    }
    if (password.length < 8) {
        return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
        return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
        return "Password must contain at least one lowercase letter.";
    }
    if (!/\d/.test(password)) {
        return "Password must contain at least one number.";
    }
    return "";
};

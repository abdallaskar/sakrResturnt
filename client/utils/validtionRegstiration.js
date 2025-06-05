

export const isValidEmail = (email) => {
    const regex = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

export const isValidPassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?![.\n]).{8,}$/;
    return regex.test(password);
}
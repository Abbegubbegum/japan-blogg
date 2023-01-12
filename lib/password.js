const password = process.env.PASSWORD || "test123";

export function checkPassword(inputPassword) {
    return inputPassword.trim() === password
}

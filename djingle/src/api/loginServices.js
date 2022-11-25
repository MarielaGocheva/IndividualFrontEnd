import URL from "./apiConstant";

const loginURL = "/login";
const login = (email, password) => {
    console.log("SENDING", email, "/", password)
    return URL.post(loginURL, {
        email: email,
        password: password
    })
}

const registerURL = "/users";
const register = (fname, lname, email, role, password) => {
    console.log("SENDING", email, "/", password)
    return URL.post(registerURL, {
        fname: fname,
        lname: lname,
        email: email,
        role: role,
        password: password
    })
}

const AccountService = {
    login,
    register
}    

export default AccountService;
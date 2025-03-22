const adminAuth = (req, res, next) => {
    console.log("Admin Auth called!!")
    // CHECK IF THE REQ IS AUTHENTICATED 
    const token ="xyz"
    const isAuthorized = token === "xyz";
    if(!isAuthorized) {
        res.status(401).send("Not Authorized")
    } else {
        next();
    }
}

const userAuth = (req, res, next) => {
    const token ="xyz"
    const isAuthorized = token === "xyz";
    if(!isAuthorized) {
        res.status(401).send("Not Authorized")
    } else {
        next();
    }
}

module.exports = {
    adminAuth,
    userAuth
}
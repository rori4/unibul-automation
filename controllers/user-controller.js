const encryption = require('../util/encryption');
const User = require('mongoose').model('User');

module.exports = {
    // registerGet: (req, res) => {
    //     res.render('users/register');
    // },
    // registerPost: async (req, res) => {
    //     const reqUser = req.body;
    //     const salt = encryption.generateSalt();
    //     const hashedPass =
    //         encryption.generateHashedPassword(salt, reqUser.password);
    //     try {
    //         const user = await User.create({
    //             email: reqUser.username,
    //             hashedPass,
    //             salt,
    //             firstName: reqUser.firstName,
    //             lastName: reqUser.lastName,
    //             roles: []
    //         });
    //         req.logIn(user, (err, user) => {
    //             if (err) {
    //                 res.locals.globalError = err;
    //                 res.render('users/register', user);
    //             } else {
    //                 res.redirect('/');
    //             }
    //         });
    //     } catch (e) {
    //         console.log(e);
    //         res.locals.globalError = e;
    //         res.render('users/register');
    //     }
    // },
    logout: (req, res) => {
        req.logout();
        res.redirect('/');
    },
    loginGet: (req, res) => {
        res.render("users/login", {layout: "auth"})
    },
    loginPost: async (req, res) => {
        const reqUser = req.body;
        try {
            const user = await User.findOne({ email: reqUser.email });
            if (!user) {
                res.locals.invalidEmail = true;
                res.locals.emailError = "Invalid email entered";
                res.render("users/login", {layout: "auth"});
                return;
            }
            if (!user.authenticate(reqUser.password)) {
                res.locals.invalidPassword = true;
                res.locals.passwordError = "Invalid password entered";
                res.render("users/login", {layout: "auth"});
                return;
            }
            req.logIn(user, (err, user) => {
                if (err) {
                    errorHandler(err);
                } else {
                    res.redirect('/');
                }
            });
        } catch (e) {
            errorHandler(e);
        }

        function errorHandler(e) {
            console.log(e);

        }
    }
};
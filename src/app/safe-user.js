export default function (app) {
    app.use(function (req, res, next) {
        if (!req.user) {
            req.user = { isLogged: false };
            next();
        };
        req.user = req.user;
        req.user.password = null;
        req.user.email_token = null;
        next();
    });
};
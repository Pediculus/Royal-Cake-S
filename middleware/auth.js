// middleware/auth.js
module.exports = {
    isAuthenticated: function (req, res, next) {
        if (req.session.user) {
            return next();
        }
        req.flash('error', 'Please log in to view that resource');
        res.redirect('/login');
    },
    isAdmin: function (req, res, next) {
        // Remove the role check
        // if (req.session.user && req.session.user.role === 'admin') {
        if (req.session.user) {
            return next();
        }
        req.flash('error', 'You do not have permission to view this resource');
        res.redirect('/login');
    }
};
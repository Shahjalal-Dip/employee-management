const isAuth = (req, res, next) => {
  if (!req.session.user) {
    req.flash('error', 'Please login to access this page');
    return res.redirect('/login');
  }
  next();
};

const isAdmin = (req, res, next) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    req.flash('error', 'Access denied. Admin privileges required.');
    return res.redirect('/employees');
  }
  next();
};

module.exports = { isAuth, isAdmin };

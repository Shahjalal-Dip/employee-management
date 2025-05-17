function isAuth(req, res, next) {
  if (req.session.isAuth) {
    return next();
  } else {
    req.flash('error_msg', 'Please login first.');
    res.redirect('/login');
  }
}

module.exports = isAuth;

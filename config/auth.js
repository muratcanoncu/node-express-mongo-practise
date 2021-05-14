const checkLogin = (req, res, next) => {
  if (!req.session.loggedInProfile) {
    return next();
  } else {
    res.redirect("/login/userprofile");
  }
};

const logOut = (req, res, next) => {
  if (!req.session.loggedInProfile) {
    return next();
  } else {
    delete req.session.loggedInProfile;
    return next();
  }
};
module.exports = { checkLogin, logOut };

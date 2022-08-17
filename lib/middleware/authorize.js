module.exports = async (req, res, next) => {
  try {
    if (!req.user)
      throw new Error('you dont have authorization for this page');
    next();
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
  

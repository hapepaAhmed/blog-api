const permit = (...allowedRoles) => {
    return (req, res, next) => {
      try {
        const { user } = req;

        if (!allowedRoles.includes(user.role)) {
          return res.status(403).json({
            error: "Access denied. You don’t have permission."
          });
        }

        next();
      } catch (err) {
        res.status(500).json({
          error: "Something went wrong in role middleware."
        });
      }
    };
  };
  
  module.exports = permit;
  
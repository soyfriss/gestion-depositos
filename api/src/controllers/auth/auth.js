const jwt = require('jsonwebtoken');
const passport = require('../../config/passport');

// Iniciar sesión de usuario
const loginUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: info.message });
    }

    // Crear un token JWT con la información del usuario
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({ token });
  })(req, res, next);
};

const logoutUser = (req, res, next) => {
  // Invalidar el token JWT
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Token inválido' });
    } else {
      res.json({ message: 'Sesión cerrada correctamente' });
    }
  });
};

module.exports = { loginUser, logoutUser };
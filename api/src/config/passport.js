const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Strategy: JWTStrategy, ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcrypt');
const { User } = require('../db');
const { JWT_SECRET } = process.env;

// Configurar la estrategia local de passport
passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {
      try {
        // Buscar al usuario por email en la base de datos
        const user = await User.findOne({ where: { username } });

        // Si el usuario no existe, devolver error
        if (!user) {
          return done(null, false, { message: 'Usuario no encontrado.' });
        }

        // Verificar que la contraseña sea correcta
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          // Si la contraseña es correcta, devolver el usuario sin contraseña
          return done(null, { id: user.id, username: user.username });
        } else {
          // Si la contraseña es incorrecta, devolver error
          return done(null, false, { message: 'Contraseña incorrecta.' });
        }
      } catch (error) {
        // Si ocurre un error, devolverlo
        return done(error);
      }
    }
  )
);

// Serializar al usuario para guardar su ID en la sesión
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserializar al usuario para obtenerlo de la sesión
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});

// Estrategia de autenticación con JWT
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
}, async (payload, done) => {
  try {
    // Buscar al usuario en la base de datos
    const user = await User.findByPk(payload.id);

    // Si el usuario no existe, devolver error
    if (!user) {
      return done(null, false);
    }

    // Devolver el usuario si todo es correcto
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
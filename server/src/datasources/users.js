const { DataSource } = require('apollo-datasource');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { parseJwt } = require('../utils/auth');

const SALT_ROUNDS = 1;
const JWT_KEY = 'lucaspokedexapollostudy';

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const createPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

const generateJwt = ({ email, name }) => {
  const expiresAt = new Date();
  // Add a week to expire the token
  expiresAt.setDate(expiresAt.getDate() + 7);

  const jwtPayload = { email, name, expiresAt };

  const token = jwt.sign(jwtPayload, JWT_KEY);
  return token;
}

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
  async findOrCreateUser({ email: emailArg, password, name = '' } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email) return null;

    const user = await this.store.users.findOne({ where: { email } });
    if (user) {
      const token = generateJwt({ email, name: user.name });
      return { email, name: user.name, token };
    }

    const passwordHash = await createPasswordHash(password);
    const newUser = await this.store.users.create({ email, name, password: passwordHash });

    const token = generateJwt({ email, name: newUser.name });

    return { email, name: newUser.name, token };
  }

  async loginUser({ email, password }) {
    const user = await this.store.users.findOne({ where: { email } });
    if (!user) return { error: 'Email and/or Password are wrong' };

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return { error: 'Email and/or Password are wrong' };

    const token = generateJwt({ email, name: user.name })
    return { token }
  }

  async getUserPokemons({ user }) {
    const userPokemons = await this.store.userPokemons.findAll({ where: { userEmail: user.email } });
    return userPokemons;
  }

  async updateUserPokemons({ pokeId, user, pokeName }) {
    // console.log('---- before delay: ', new Date().toISOString());
    // await delay(3000);
    // console.log('---- after delay: ', new Date().toISOString());
    const userPokemon = await this.store.userPokemons.findOne(
      { where: { userEmail: user.email, pokeId } }
    );

    if (userPokemon) {
      await this.store.userPokemons.destroy(
        { where: { userEmail: user.email, pokeId } }
      );

      return { userPokemon, action: 'delete' }
    }

    if (!userPokemon) {
      const newUserPokemon = await this.store.userPokemons.create(
        { userEmail: user.email, pokeId, pokeName }
      );

      return { userPokemon: newUserPokemon, action: 'create' };
    }
  }
}

module.exports = UserAPI;

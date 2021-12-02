const { DataSource } = require('apollo-datasource');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 1;

const createPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hash = await bcrypt.hash(password, salt);
  return hash;
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
    if (user) return user;

    const passwordHash = await createPasswordHash(password);
    const newUser = await this.store.users.create({ email, name, password: passwordHash });

    return newUser;
  }
}

module.exports = UserAPI;

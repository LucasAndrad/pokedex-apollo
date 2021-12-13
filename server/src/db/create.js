const { Sequelize } = require('sequelize');

module.exports.createStore = async () => {
  const Op = Sequelize.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new Sequelize('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './store.sqlite',
    operatorsAliases,
    logging: false,
  });

  const users = db.define('user', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    profileImage: Sequelize.STRING,
    // Favorites pokemons. This string should save the pokemons ids: "1,43,9"
    favorites: Sequelize.STRING,
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
      get() {
        const value = this.getDataValue('createdAt');
        return value.toISOString();
      }
    },
    updatedAt: Sequelize.DATE,
  });

  const userPokemons = db.define('userpokemon', {
    userEmail: Sequelize.STRING,
    pokeId: Sequelize.STRING,
    pokeName: Sequelize.STRING,
  });

  await users.sync();
  await userPokemons.sync();

  return { db, users, userPokemons };
};

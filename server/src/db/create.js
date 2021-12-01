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
    token: Sequelize.STRING,
    profileImage: Sequelize.STRING,
    // Favorites pokemons. This string should save the pokemons ids: "1,43,9"
    favorites: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  });

  await users.sync();

  return { db, users };
};

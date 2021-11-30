const { Sequelize } = require('sequelize');

module.exports.createStore = () => {
  const db = new Sequelize({
    dialect: 'sqlite',
    storage: './store.sqlite'
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

  return { db, users };
};

module.exports = (sequelize, DataTypes) => {
  const Tutorial = sequelize.define("Tutorial", {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    published: {
      type: DataTypes.TEXT,
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
  });

  return Tutorial;
};

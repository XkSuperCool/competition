const path = require('path');
const fs = require('fs');
const folderPath = path.join('./', 'app/schema');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const schemas = [];
      let eventTypeSchema = {};
      let userSchema = {};
      const files = fs.readdirSync(folderPath);
      for (const fileName of files) {
        const filePath = path.join('../../app/schema/', fileName);
        const schema = require(filePath)({ Sequelize });
        const map = {
          schema,
          name: fileName.replace('.js', ''),
        };
        if (map.name === 'eventType') {
          eventTypeSchema = map;
          continue;
        }
        if (map.name === 'user') {
          userSchema = map;
          continue;
        }
        schemas.push(map);
      }
      // 优先创建 eventType
      await queryInterface.createTable(eventTypeSchema.name, eventTypeSchema.schema);
      await queryInterface.createTable(userSchema.name, userSchema.schema);
      for (let i = 0, len = schemas.length; i < len; i++) {
        await queryInterface.createTable(schemas[i].name, schemas[i].schema);
      }
    } catch (err) {
      console.log(err);
    }
  },

  down: async queryInterface => {
    await queryInterface.dropAllTables();
  },
};

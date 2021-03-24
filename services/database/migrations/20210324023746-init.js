import path from 'path';
import fs from 'fs';
const folderPath = path.join('./', 'app/schema');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const files = fs.readdirSync(folderPath);
      for (const fileName of files) {
        const filePath = path.join('../../app/schema/', fileName);
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const schema = require(filePath)({ Sequelize });
        await queryInterface.createTable(fileName.replace('.js', ''), schema);
      }
    } catch {
      //
    }
  },

  down: async queryInterface => {
    await queryInterface.dropAllTables();
  },
};

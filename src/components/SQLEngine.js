import initSqlJs from 'sql.js';

const SQLEngine = async (commands) => {
  try {
    const config = {
      locateFile: (filename) => `/src/${filename}`,
    };

    const SQL = await initSqlJs(config);
    const db = new SQL.Database();

    try {
      const result = db.exec(commands);
      return { result };
    } finally {
      db.close();
    }
  } catch (error) {
    console.error(error);
    return { error: error.message || error.toString() };
  }
};

export default SQLEngine;

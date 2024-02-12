const SQLEngine = async (commands) => {
  try {
    const config = {
      locateFile: () => `./node_modules/sql.js/dist/sql-wasm.wasm`
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

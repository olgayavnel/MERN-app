import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectID;

let pandas; // stores a reference to the db

/**
 * The PandasDAO class provides a data access layer that interacts with the database to retrieve and store data.
 */
export default class PandasDAO {
  static async injectDB(conn) {
    if (pandas) {
      return;
    }
    try {
      pandas = await conn.db(process.env.PANDAS_DB_NAME).collection('pandas');
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in pandasDAO: ${e}`
      );
    }
  }

  static async getPandas({
    filters = null,
    page = 0,
    pandasPerPage = 20,
  } = {}) {
    let query;
    if (filters) {
      if ('name' in filters) {
        query = { $text: { $search: filters['name'] } };
      } else if ('age' in filters) {
        query = { age: { $eq: filters['age'] } };
      } else if ('location' in filters) {
        query = { location: { $eq: filters['location'] } };
      }
    }

    let cursor;

    try {
      cursor = await pandas.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { pandasList: [], totalNumPandas: 0 };
    }

    const displayCursor = cursor
      .limit(pandasPerPage)
      .skip(pandasPerPage * page);

    try {
      const pandasList = await displayCursor.toArray();
      const totalNumPandas = await pandas.countDocuments(query);

      return { pandasList, totalNumPandas };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { pandasList: [], totalNumPandas: 0 };
    }
  }
}

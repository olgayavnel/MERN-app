import mongodb from 'mongodb';
import { ObjectId } from 'mongodb';

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
    pandasPerPage = 10,
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

  static async getPandaById(id) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
      ];
      return await pandas.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getPandaById: ${e}`);
      throw e;
    }
  }

  static async addPanda(name, age, location) {
    try {
      const pandaDoc = { name, age, location };
      return await pandas.insertOne(pandaDoc);
    } catch (e) {
      console.error(`Unable to post panda, ${e}`);
      return { error: e };
    }
  }

  static async updatePanda(pandaId, name, age, location) {
    try {
      const updateResponse = await pandas.updateOne(
        { _id: new ObjectId(pandaId) },
        { $set: { name, age, location } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update panda, ${e}`);
      return { error: e };
    }
  }

  static async deletePanda(pandaId) {
    try {
      const deleteResponse = await pandas.deleteOne({
        _id: new ObjectId(pandaId),
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete panda, ${e}`);
      return { error: e };
    }
  }
}

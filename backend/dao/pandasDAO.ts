import { Collection, Db, ObjectId } from 'mongodb';

interface Panda {
  _id?: ObjectId;
  name: string;
  age: number;
  location: string;
}

interface Filter {
  name?: string;
  age?: number;
  location?: string;
}

// let pandas; // stores a reference to the db

/**
 * The PandasDAO class provides a data access layer that interacts with the database to retrieve and store data.
 */
export default class PandasDAO {
  private static pandas: Collection<Panda>;

  static async injectDB(conn: any) {
    if (PandasDAO.pandas) {
      return;
    }
    try {
      PandasDAO.pandas = await conn
        .db(process.env.PANDAS_DB_NAME)
        .collection('pandas');
    } catch (e) {
      console.error(
        `Unable to establish a collection handle in pandasDAO: ${e}`
      );
    }
  }

  static async getPandas({
    filters = {},
    page = 0,
    pandasPerPage = 10,
  }: {
    filters: Filter;
    page: number;
    pandasPerPage: number;
  }): Promise<{
    pandasList: Panda[];
    totalNumPandas: number;
    totalPages: number;
  }> {
    let query = {};
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
      cursor = await PandasDAO.pandas.find(query);
    } catch (e) {
      console.error(`Unable to issue find command, ${e}`);
      return { pandasList: [], totalNumPandas: 0, totalPages: 0 };
    }

    const displayCursor = cursor
      .limit(pandasPerPage)
      .skip(pandasPerPage * page);

    try {
      const pandasList = await displayCursor.toArray();
      const totalNumPandas = await PandasDAO.pandas.countDocuments(query);
      const totalPages = Math.ceil(totalNumPandas / pandasPerPage);
      return { pandasList, totalNumPandas, totalPages };
    } catch (e) {
      console.error(
        `Unable to convert cursor to array or problem counting documents, ${e}`
      );
      return { pandasList: [], totalNumPandas: 0, totalPages: 0 };
    }
  }

  static async getPandaById(id: string) {
    try {
      const pipeline = [
        {
          $match: {
            _id: new ObjectId(id),
          },
        },
      ];
      return await PandasDAO.pandas.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getPandaById: ${e}`);
      throw e;
    }
  }

  static async addPanda(name: string, age: number, location: string) {
    try {
      const pandaDoc = { name, age, location };
      return await PandasDAO.pandas.insertOne(pandaDoc);
    } catch (e) {
      console.error(`Unable to post panda, ${e}`);
      return { error: e };
    }
  }

  static async updatePanda(
    pandaId: string,
    name: string,
    age: number,
    location: string
  ) {
    try {
      const updateResponse = await PandasDAO.pandas.updateOne(
        { _id: new ObjectId(pandaId) },
        { $set: { name, age, location } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update panda, ${e}`);
      return { error: e };
    }
  }

  static async deletePanda(pandaId: string) {
    try {
      const deleteResponse = await PandasDAO.pandas.deleteOne({
        _id: new ObjectId(pandaId),
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete panda, ${e}`);
      return { error: e };
    }
  }

  static async getPandaByName(name: string) {
    try {
      const pipeline = [
        {
          $match: {
            name: name,
          },
        },
      ];
      return await PandasDAO.pandas.aggregate(pipeline).next();
    } catch (e) {
      console.error(`Something went wrong in getPandaByName: ${e}`);
      throw e;
    }
  }
}

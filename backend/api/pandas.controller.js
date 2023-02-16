import PandasDAO from '../dao/pandasDAO.js';

/**
 * PandasController class acts as a controller that
 * handles incoming HTTP requests from a route and
 * communicates with the DAO layer.
 */
export default class PandasController {
  static async apiGetPandas(req, res) {
    const pandasPerPage = req.query.pandasPerPage
      ? parseInt(req.query.pandasPerPage, 10)
      : 10;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.age) {
      filters.age = req.query.age;
    } else if (req.query.location) {
      filters.location = req.query.location;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }

    const { pandasList, totalNumPandas } = await PandasDAO.getPandas({
      filters,
      page,
      pandasPerPage,
    });

    let response = {
      pandas: pandasList,
      page: page,
      filters: filters,
      entries_per_page: pandasPerPage,
      total_results: totalNumPandas,
    };
    res.json(response);
  }

  // handling the route of getting the detail of a single panda
  static async apiGetPandaById(req, res) {
    try {
      let id = req.params.id || {};
      let panda = await PandasDAO.getPandaById(id);
      if (!panda) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json(panda);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  // handling the route of creating a new panda
  static async apiCreatePanda(req, res) {
    try {
      const pandaName = req.body.name;
      const pandaAge = req.body.age;
      const pandaLocation = req.body.location;
      const pandaResponse = await PandasDAO.addPanda(
        pandaName,
        pandaAge,
        pandaLocation
      );
      res.json({ status: 'success', response: pandaResponse });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  // handling the route of updating a panda
  static async apiUpdatePanda(req, res) {
    try {
      const pandaId = req.params.id;
      const pandaName = req.body.name;
      const pandaAge = req.body.age;
      const pandaLocation = req.body.location;
      const pandaResponse = await PandasDAO.updatePanda(
        pandaId,
        pandaName,
        pandaAge,
        pandaLocation
      );
      var { error } = pandaResponse;
      if (error) {
        res.status(400).json({ error });
      }

      if (pandaResponse.modifiedCount === 0) {
        throw new Error(
          'unable to update panda - user may not be original poster'
        );
      }

      res.json({ status: 'success', response: pandaResponse });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  // handling the route of deleting a panda
  static async apiDeletePanda(req, res) {
    try {
      const pandaId = req.params.id;
      const pandaResponse = await PandasDAO.deletePanda(pandaId);
      res.json({ status: 'success', response: pandaResponse });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  // handling the route of getting the detail of a single panda by name
  static async apiGetPandaByName(req, res) {
    try {
      let name = req.params.name || {};
      let panda = await PandasDAO.getPandaByName(name);
      if (!panda) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json(panda);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}

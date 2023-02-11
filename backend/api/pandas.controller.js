import PandasDAO from '../dao/pandasDAO.js';

/**
 * PandasController class acts as a controller that
 * handles incoming HTTP requests from a route and
 * communicates with the DAO layer.
 */
export default class PandasController {
  static async apiGetPandas(req, res, next) {
    const pandasPerPage = req.query.pandasPerPage
      ? parseInt(req.query.pandasPerPage, 10)
      : 20;
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
}

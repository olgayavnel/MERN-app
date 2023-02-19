import { Request, Response } from 'express';
import PandasDAO from '../dao/pandasDAO';

interface PandaUpdateResponse {
  modifiedCount?: number;
  error?: unknown;
}

/**
 * PandasController class acts as a controller that
 * handles incoming HTTP requests from a route and
 * communicates with the DAO layer.
 */
export default class PandasController {
  static async apiGetPandas(req: Request, res: Response): Promise<void> {
    const pandasPerPage: number = req.query.pandasPerPage
      ? parseInt(req.query.pandasPerPage as string, 10)
      : 10;
    const page: number = req.query.page
      ? parseInt(req.query.page as string, 10)
      : 0;

    let filters: Record<string, string> = {};
    // let filters = {};
    if (req.query.age) {
      filters = { ...filters, age: req.query.age as string };
    } else if (req.query.location) {
      filters = { ...filters, location: req.query.location as string };
    } else if (req.query.name) {
      filters = { ...filters, name: req.query.name as string };
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
  static async apiGetPandaById(req: Request, res: Response): Promise<void> {
    try {
      let id: string = req.params.id || '';
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
  static async apiCreatePanda(req: Request, res: Response): Promise<void> {
    try {
      const pandaName: string = req.body.name;
      const pandaAge: number = req.body.age;
      const pandaLocation: string = req.body.location;
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
  static async apiUpdatePanda(req: Request, res: Response): Promise<void> {
    try {
      const pandaId: string = req.params.id;
      const pandaName: string = req.body.name;
      const pandaAge: number = req.body.age;
      const pandaLocation: string = req.body.location;
      const pandaResponse: PandaUpdateResponse = await PandasDAO.updatePanda(
        pandaId,
        pandaName,
        pandaAge,
        pandaLocation
      );

      if (pandaResponse.error) {
        res.status(400).json({ error: pandaResponse.error });
        return;
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
  static async apiDeletePanda(req: Request, res: Response): Promise<void> {
    try {
      const pandaId = req.params.id;
      const pandaResponse = await PandasDAO.deletePanda(pandaId);
      res.json({ status: 'success', response: pandaResponse });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

  // handling the route of getting the detail of a single panda by name
  static async apiGetPandaByName(req: Request, res: Response): Promise<void> {
    try {
      let name: string = req.params.name || '';
      let pandaResponse = await PandasDAO.getPandaByName(name);
      if (!pandaResponse) {
        res.status(404).json({ error: 'Not found' });
        return;
      }
      res.json(pandaResponse);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
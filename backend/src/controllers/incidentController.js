import { incidentService } from "../services/incidentService.js";

export async function list(req, res) {
  const incidents = await incidentService.getAll(req.userId);
  res.json(incidents);
}

export async function create(req, res) {
  const newIncident = await incidentService.create(req.userId, req.body);
  res.status(201).json(newIncident);
}

export async function update(req, res) {
  const { id } = req.params;
  await incidentService.update(req.userId, parseInt(id), req.body);
  res.json({ message: "Incident updated" });
}

export async function remove(req, res) {
  const { id } = req.params;
  await incidentService.remove(req.userId, parseInt(id));
  res.json({ message: "Incident deleted" });
}

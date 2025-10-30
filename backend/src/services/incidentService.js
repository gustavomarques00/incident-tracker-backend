import { prisma } from "../app.js";

export const incidentService = {
  async getAll(userId) {
    return prisma.incident.findMany({ where: { userId } });
  },

  async create(userId, data) {
    return prisma.incident.create({
      data: { ...data, userId },
    });
  },

  async update(userId, id, data) {
    return prisma.incident.updateMany({
      where: { id, userId },
      data,
    });
  },

  async remove(userId, id) {
    return prisma.incident.deleteMany({ where: { id, userId } });
  },
};

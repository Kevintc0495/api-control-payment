import { Op, type WhereOptions } from "sequelize";

export const buildFilters = <T extends object>(
  query: Partial<Record<keyof T, unknown>>,
): WhereOptions => {
  const filters: WhereOptions = {};

  for (const key in query) {
    if (query[key] !== undefined && query[key] !== null) {
      const value = query[key];
      const expectedType = typeof query[key as keyof T];

      if (expectedType === "string" && value)
        filters[key] = { [Op.like]: `%${value}%` };
      if (key === "state" && value) filters.state = value;
      // else filters[key] = value;
    }
  }
  if (filters?.state) filters.state = filters.state === "1";

  return filters;
};

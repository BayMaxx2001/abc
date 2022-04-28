import { getAPI } from '.';

export const GetOrders = (store_name, status) =>
  getAPI(`orders/?store=${store_name}&status=${status}`);

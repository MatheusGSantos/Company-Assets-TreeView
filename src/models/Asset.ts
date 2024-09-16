type Asset = {
  id: string;
  name: string;
  locationId: string | null;
  parentId: string | null;
  gatewayId: string | null;
  sensorId: string | null;
  sensorType: string | null;
  status: string | null;
};

export default Asset;

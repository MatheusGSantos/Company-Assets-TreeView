type Asset = {
  id: string;
  name: string;
  locationId: string | null;
  gatewayId: string;
  parentId: string | null;
  sensorId: string | null;
  sensorType: string | null;
  status: string | null;
};

export default Asset;

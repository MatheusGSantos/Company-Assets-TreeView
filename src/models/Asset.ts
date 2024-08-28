type Asset = {
  id: string;
  name: string;
  locationId: string;
  parentId: string | null;
  sensorType: string | null;
  status: string | null;
};

export default Asset;

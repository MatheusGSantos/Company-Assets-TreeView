type Asset = {
  id: string;
  name: string;
  locationId: string;
  parentId: number | null;
  sensorType: string | null;
  status: string | null;
};

export default Asset;

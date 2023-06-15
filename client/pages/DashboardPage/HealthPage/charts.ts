export interface DataPoint {
  x: number;
  y: number | string;
}

export interface DataObj {
  id: string;
  data: DataPoint[];
}
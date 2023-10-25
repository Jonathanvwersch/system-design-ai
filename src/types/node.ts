export type SystemDesignNode = {
  id: string;
  type: string;
  description: string;
  inConnections: string[];
  coordinates: { x: number; y: number };
  subType?: string;
};

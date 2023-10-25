import { SystemDesignNode } from "@/types/node";

export function getXCoordinatesRange(data: SystemDesignNode[]) {
  let minX = Infinity;
  let maxY = 0;

  data.forEach((d) => {
    minX = Math.min(minX, d.coordinates.x);
    maxY = Math.max(maxY, d.coordinates.x);
  });

  return { minX: minX, maxX: maxY };
}

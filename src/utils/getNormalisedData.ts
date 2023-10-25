import { SystemDesignNode } from "@/types";

export function getNormalisedData(data: SystemDesignNode[]) {
  const _data = JSON.parse(JSON.stringify(data)) as SystemDesignNode[];
  let minXCoordinate = Infinity;

  for (let datum of _data) {
    minXCoordinate = Math.min(datum.coordinates.x, minXCoordinate);
  }
  const _normalisedData = _data.map((datum) => {
    datum.coordinates.x = datum.coordinates.x - minXCoordinate;
    return datum;
  });

  return _normalisedData;
}

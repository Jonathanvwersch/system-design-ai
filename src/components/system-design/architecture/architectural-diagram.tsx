import React from "react";
import createEngine, {
  DefaultNodeModel,
  DiagramModel,
} from "@projectstorm/react-diagrams";

import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { SystemDesignNode } from "@/types";

type DiagramProps = {
  data: SystemDesignNode[];
  maxDiagramWidth: number;
};

export function ArchitecturalDiagram({ data, maxDiagramWidth }: DiagramProps) {
  let engine = createEngine();
  let model = new DiagramModel();
  let nodes: { [key: string]: DefaultNodeModel } = {};

  data.forEach((item) => {
    const subType = item.subType ? ` (${item.subType})` : "";
    const node = new DefaultNodeModel({
      name: `${item.type}${subType}`,
    });
    node.setPosition(item.coordinates.x, item.coordinates.y);
    nodes[item.id] = node;
  });

  data.forEach((item) => {
    const currNode = nodes[item.id];
    let inPort = currNode.getInPorts()[0];
    if (!inPort) {
      inPort = currNode.addInPort(`in`);
    }

    item.inConnections.forEach((id) => {
      const outNode = nodes[id];
      let outPort = outNode.getOutPorts()[0];
      if (!outPort) {
        outPort = outNode.addOutPort(`out`);
      }

      let link = outPort.link(inPort);

      model.addLink(link);
    });
  });

  model.addAll(...Object.values(nodes));
  engine.setModel(model);

  if (!maxDiagramWidth) {
    return null;
  }

  return (
    <div
      className={`[&>div]:h-screen [&>div]:m-auto [&>div]:w-[${maxDiagramWidth}px]`}
    >
      <CanvasWidget engine={engine} />
    </div>
  );
}

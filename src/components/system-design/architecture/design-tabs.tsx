"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemDesignNode } from "@/types/node";
import "./styles.css";
import dynamic from "next/dynamic";

const ArchitecturalDiagram = dynamic<{
  data: SystemDesignNode[];
  maxDiagramWidth: number;
}>(
  () =>
    import(
      "@/components/system-design/architecture/architectural-diagram"
    ).then((mode) => mode.ArchitecturalDiagram),
  {
    ssr: false,
  }
);

type Props = {
  data: SystemDesignNode[];
  xCoordinatesRange: { maxX: number; minX: number };
};

export function DesignTabs({ data, xCoordinatesRange }: Props) {
  const maxDiagramWidth = xCoordinatesRange.minX + xCoordinatesRange.maxX + 88;

  return (
    <>
      {data.length ? (
        <Tabs
          defaultValue="design"
          className="mt-10 w-full flex items-center justify-center flex-col"
        >
          <TabsList className="w-full max-w-4xl">
            <TabsTrigger className="w-full" value="design">
              Architecture
            </TabsTrigger>
            <TabsTrigger className="w-full" value="deep-dive">
              Deep dive
            </TabsTrigger>
          </TabsList>

          <>
            <TabsContent className="w-full mt-5" value="design">
              <ArchitecturalDiagram
                data={data}
                maxDiagramWidth={maxDiagramWidth}
              />
            </TabsContent>
            <TabsContent
              value="deep-dive"
              className="flex flex-col gap-4 mt-10 max-w-4xl w-full"
            >
              {data.map((d) => {
                const subType = d.subType ? ` (${d.subType})` : "";
                return (
                  <div key={d.id}>
                    <div className="text-lg font-semibold">
                      {`${d.type}${subType}`}
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {d.description}
                    </p>
                  </div>
                );
              })}
            </TabsContent>
          </>
        </Tabs>
      ) : null}
    </>
  );
}

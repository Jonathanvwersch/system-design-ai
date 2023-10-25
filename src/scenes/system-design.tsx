"use client";

import { useMemo, useState } from "react";

import { SystemDesignNode } from "@/types";
import { InstructionsForm } from "@/components/system-design/InstructionsForm";
import { DesignTabs } from "@/components/system-design/architecture/design-tabs";
import { getXCoordinatesRange } from "@/utils/getXCoordinatesRange";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { getNormalisedData } from "@/utils/getNormalisedData";

export function SystemDesign() {
  const [data, setData] = useState<SystemDesignNode[]>([]);
  const xCoordinatesRange = useMemo(() => getXCoordinatesRange(data), [data]);
  const normalisedData = useMemo(() => getNormalisedData(data), [data]);

  return (
    <main className="flex flex-col items-center justify-between">
      <Alert className="max-w-4xl mb-20">
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Please note that this is just a proof of concept. There may be bugs
          and the diagrams may not be entirely correct.
        </AlertDescription>
      </Alert>
      <InstructionsForm setData={setData} />
      <DesignTabs data={normalisedData} xCoordinatesRange={xCoordinatesRange} />
    </main>
  );
}

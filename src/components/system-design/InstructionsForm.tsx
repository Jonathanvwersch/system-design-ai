"use client";

import { Dispatch, SetStateAction, useState } from "react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { SystemDesignNode } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  setData: Dispatch<SetStateAction<SystemDesignNode[]>>;
};

export function InstructionsForm({ setData }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [prompt, setPrompt] = useState<string>("");
  const [functional, setFunctional] = useState<string>("");
  const [nonFunctional, setNonFunctional] = useState<string>("");

  async function handleSubmit() {
    setError(false);

    if (!prompt) {
      return;
    }

    setData([]);
    setLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          nonFunctionalReqs: nonFunctional,
          functionalReqs: functional,
        }),
      });
      const json = (await response.json()).design as SystemDesignNode[];

      setData(json);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="max-w-4xl z-10 items-center justify-center lg:flex gap-2 w-full">
      <div className="flex align-start flex-col gap-3 mb-4 w-full">
        <p className="text-lg font-semibold">What do you want to design?</p>
        <Input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="YouTube"
        />
        <p className="text-lg font-semibold mt-4">
          What are your requirements?
        </p>
        <div className="flex flex-col gap-2 w-100">
          <Textarea
            placeholder="Functional"
            value={functional}
            onChange={(e) => setFunctional(e.target.value)}
          />
          <Textarea
            placeholder="Non functional"
            value={nonFunctional}
            onChange={(e) => setNonFunctional(e.target.value)}
          />
        </div>
        <div className="flex flex-end w-full justify-end mt-3 gap-2">
          <Button
            disabled={(!prompt && !functional && !nonFunctional) || loading}
            variant="secondary"
            type="reset"
            style={{ whiteSpace: "nowrap" }}
            onClick={() => {
              setNonFunctional("");
              setFunctional("");
              setPrompt("");
            }}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={!!!prompt}
            variant="default"
            style={{ whiteSpace: "nowrap" }}
            onClick={handleSubmit}
            loading={loading}
          >
            Generate
          </Button>
        </div>
        {loading ? (
          <p className="text-sm text-muted-foreground m-auto">
            It can take up to a minute for your design to be created so hold
            tight
          </p>
        ) : null}
        {error ? (
          <Alert variant="destructive" className="mt-3">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Something went wrong. Please try again.
            </AlertDescription>
          </Alert>
        ) : null}
      </div>
    </form>
  );
}

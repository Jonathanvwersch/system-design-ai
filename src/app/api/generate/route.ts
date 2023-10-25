import { SystemDesignNode } from "@/types/node";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, functionalReqs, nonFunctionalReqs } = await req.json();

    if (
      typeof prompt !== "string" ||
      (functionalReqs && typeof functionalReqs !== "string") ||
      (nonFunctionalReqs && typeof nonFunctionalReqs !== "string")
    ) {
      return new Response(null, {
        status: 400,
      });
    }

    const functionalText = functionalReqs
      ? `You are given the following functional requirements: ${functionalReqs}.`
      : "";
    const nonFunctionalText = nonFunctionalReqs
      ? `You are given the following non-functional requirements: ${nonFunctionalReqs}.`
      : "";

    const requestBody = {
      messages: [
        {
          role: "system",
          content: `Context: You are an experienced software architect who is an expert in designing complex, scalable systems. Design Problem: ${prompt}. ${functionalText} ${nonFunctionalText} Guidelines: Use these node types: Load Balancer, Client, Server, Database, Cache, Messaging Queue, Workers, API Gateway, Task Queues, Blob Store, CDN. Output: Return a JSON array with up to 10 node objects describing a high-level system design that meets the requirements. Each object should contain: - "id": unique identifier - "type": one of the 11 node types - "subType": optional field for more specifying more info about the type e.g. NoSQL or SQL for the database, the name of the server (ingest, block, etc), the type of workers e.g. transcoding workers - "description": highly technical and prompt-specific, you want to include as much information as possible, talk about algorithms used, what the node does, why it's necessary in this system, etc - "inConnections": array of node IDs connecting to this node, for instance a load balancer would typically have an in-connection from the client block as a request would be made to the load balancer, which would then distribute load across a set of server; a node can have more than one in-connection, for instance a server may be connected to a cache and a database. Every node must be connected to another node in some way. The nodes should never just be linked in a straight line. - "coordinates": { "x": horizontal position, "y": vertical position }. Ensure the x and y coordinates allow for the nodes to not overlap taking into account that they are 88px in width and they will be rendered on a webpage using @projectstorm/react-diagrams. Format: Return your answer in a parseable JSON string format, like: [{"id": "2345"}]`,
        },
      ],
      frequency_penalty: 0,
      max_tokens: 2500,
      temperature: 0.1,
      top_p: 0.1,
      model: "gpt-3.5-turbo",
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error(response);
      return new Response(null, {
        status: 500,
      });
    }

    const responseData = await response.json();
    const design = responseData.choices[0].message.content.trim();
    const parsedDesign = JSON.parse(design) as SystemDesignNode[];

    return NextResponse.json({ design: parsedDesign });
  } catch (error) {
    console.error(error);
    return new Response(null, {
      status: 500,
    });
  }
}

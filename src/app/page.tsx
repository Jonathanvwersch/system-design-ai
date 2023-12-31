import { DesignTabs } from "@/components/system-design/architecture/design-tabs";
import { Button } from "@/components/ui/button";
import { SystemDesignNode } from "@/types";
import { getNormalisedData } from "@/utils/getNormalisedData";
import { getXCoordinatesRange } from "@/utils/getXCoordinatesRange";
import Link from "next/link";
import { useMemo } from "react";

const data = [
  {
    id: "1",
    type: "Client",
    description:
      "The client is the user interface through which users interact with the YouTube system. It allows users to search for videos, watch videos, upload videos, and perform other actions. The client sends requests to the API Gateway for processing.",
    inConnections: [],
    coordinates: {
      x: 50,
      y: 50,
    },
  },
  {
    id: "2",
    type: "API Gateway",
    description:
      "The API Gateway acts as a single entry point for all client requests. It handles authentication, request routing, and load balancing. It forwards requests to the appropriate server for processing.",
    inConnections: ["1"],
    coordinates: {
      x: 200,
      y: 50,
    },
  },
  {
    id: "3",
    type: "Load Balancer",
    subType: "Ingest Server",
    description:
      "The Load Balancer distributes incoming video uploads across multiple Ingest Servers. It ensures that the upload process is efficient and scalable. It uses load balancing algorithms to evenly distribute the workload.",
    inConnections: ["2"],
    coordinates: {
      x: 350,
      y: 50,
    },
  },
  {
    id: "4",
    type: "Server",
    subType: "Ingest Server",
    description:
      "The Ingest Server receives video uploads from the Load Balancer. It processes the uploaded videos, performs validation checks, and stores the videos in the Blob Store. It also generates thumbnails and extracts metadata from the videos.",
    inConnections: ["3"],
    coordinates: {
      x: 500,
      y: 50,
    },
  },
  {
    id: "5",
    type: "Blob Store",
    description:
      "The Blob Store is a distributed storage system that stores the uploaded videos. It provides high availability and durability. It allows for efficient retrieval and storage of large video files.",
    inConnections: ["4"],
    coordinates: {
      x: 650,
      y: 50,
    },
  },
  {
    id: "6",
    type: "Server",
    subType: "Block Server",
    description:
      "The Block Server stores video blocks, which are smaller units of a video. It allows for efficient retrieval and streaming of videos. It uses caching mechanisms to improve performance.",
    inConnections: ["5"],
    coordinates: {
      x: 800,
      y: 50,
    },
  },
  {
    id: "7",
    type: "Cache",
    description:
      "The Cache stores frequently accessed video blocks. It improves the performance of video streaming by reducing the latency of block retrieval. It uses caching algorithms to determine which blocks to store and evict.",
    inConnections: ["6"],
    coordinates: {
      x: 950,
      y: 50,
    },
  },
  {
    id: "8",
    type: "Server",
    subType: "Transcoding Server",
    description:
      "The Transcoding Server converts uploaded videos into multiple formats and resolutions. It allows for adaptive streaming, where the video quality is adjusted based on the user's network conditions. It uses video transcoding algorithms to perform the conversion.",
    inConnections: ["4"],
    coordinates: {
      x: 500,
      y: 150,
    },
  },
  {
    id: "9",
    type: "Workers",
    subType: "Transcoding Workers",
    description:
      "The Transcoding Workers are responsible for performing the video transcoding tasks. They receive jobs from the Transcoding Server and process them in parallel. They use distributed computing algorithms to efficiently utilize the available resources.",
    inConnections: ["8"],
    coordinates: {
      x: 650,
      y: 150,
    },
  },
  {
    id: "10",
    type: "Database",
    subType: "NoSQL",
    description:
      "The NoSQL Database stores metadata about the videos, such as title, description, and tags. It allows for fast and flexible querying of the video data. It scales horizontally to handle the large amount of metadata generated by the system.",
    inConnections: ["2", "4"],
    coordinates: {
      x: 350,
      y: 150,
    },
  },
  {
    id: "11",
    type: "Messaging Queue",
    description:
      "The Messaging Queue is used for asynchronous communication between different components of the system. It decouples the sender and receiver, allowing for scalability and fault tolerance. It ensures reliable message delivery.",
    inConnections: ["4", "9"],
    coordinates: {
      x: 800,
      y: 150,
    },
  },
  {
    id: "12",
    type: "Server",
    subType: "Search Server",
    description:
      "The Search Server handles search queries from the client. It indexes the video metadata stored in the database and provides fast and accurate search results. It uses search algorithms and indexing techniques to optimize the search process.",
    inConnections: ["10"],
    coordinates: {
      x: 500,
      y: 250,
    },
  },
  {
    id: "13",
    type: "Server",
    subType: "Recommendation Server",
    description:
      "The Recommendation Server generates personalized video recommendations for users. It analyzes user behavior and preferences to provide relevant and engaging recommendations. It uses recommendation algorithms and machine learning techniques to improve the quality of recommendations.",
    inConnections: ["10"],
    coordinates: {
      x: 650,
      y: 250,
    },
  },
  {
    id: "14",
    type: "Server",
    subType: "Analytics Server",
    description:
      "The Analytics Server collects and analyzes data about user interactions with the YouTube system. It provides insights and metrics to improve the system's performance and user experience. It uses data analytics algorithms and visualization techniques to process and present the data.",
    inConnections: ["10"],
    coordinates: {
      x: 800,
      y: 250,
    },
  },
  {
    id: "15",
    type: "CDN",
    description:
      "The Content Delivery Network (CDN) caches and delivers video content to users. It reduces the latency of video streaming by serving videos from edge servers located closer to the users. It uses caching and content routing algorithms to optimize content delivery.",
    inConnections: ["6", "12", "13", "14"],
    coordinates: {
      x: 950,
      y: 250,
    },
  },
  {
    id: "16",
    type: "Task Queues",
    description:
      "The Task Queues manage and distribute background tasks in the system. They ensure that tasks are executed in a reliable and scalable manner. They use task scheduling algorithms to prioritize and allocate resources for task execution.",
    inConnections: ["11", "14"],
    coordinates: {
      x: 800,
      y: 350,
    },
  },
];

export default function Main() {
  const xCoordinatesRange = useMemo(() => getXCoordinatesRange(data), []);
  const normalisedData = useMemo(() => getNormalisedData(data), []);

  return (
    <main className="max-w-4xl w-full m-auto">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center mb-5">
        System Design AI
      </h1>
      <p className="text-lg text-muted-foreground text-center mb-8">
        Create software architectural diagrams using AI
      </p>
      <div className="flex items-center justify-center w-full">
        <Link href="/system-design" className="m-auto">
          <Button>Try it out</Button>
        </Link>
      </div>
      <div className="mt-32">
        <p className="text-md text-center mb-8">
          Example prompt: Design YouTube
        </p>
        <DesignTabs
          data={normalisedData}
          xCoordinatesRange={xCoordinatesRange}
        />
      </div>
    </main>
  );
}

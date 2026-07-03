/*
 * This file is the entry point for the queue listener worker. It imports the necessary worker files to start listening to the queues.
 * Each worker file is responsible for listening to a specific queue and processing the jobs in that queue.
 * In this case, we have an embedding worker that listens to the "embedding" queue and processes jobs related to creating embeddings for article candidates.
 * The extracting worker listens to the "extracting" queue and processes jobs related to extracting metadata from raw articles.
 */

import "./queues/workers/embedding.worker.js";
import "./queues/workers/extracting.worker.js";

console.log("Queue workers started");

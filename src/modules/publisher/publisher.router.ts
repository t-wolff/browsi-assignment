import express from "express";
import { getPublishersWithSearch, getAllPublishers, createPublisher, deletePublisher } from "./publisher.controller";
import { ZodValidate } from "../../utils/zod.middleware";
import { getPublishersWithSearchSchema, newPublisherSchema, deletePublisherSchema } from "./publisher.schema";

const publisherRouter = express.Router();

// publisherRouter.get("/search/:searchQuery?", ZodValidate(getPublishersWithSearchSchema), getPublishersWithSearch);
publisherRouter.get("/", getAllPublishers);
publisherRouter.post("/", ZodValidate(newPublisherSchema), createPublisher);
publisherRouter.delete("/:id?", ZodValidate(deletePublisherSchema), deletePublisher);

export { publisherRouter };

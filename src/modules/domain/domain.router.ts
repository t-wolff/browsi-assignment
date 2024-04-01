import express from "express";
import { createNewDomain, getAllDomains, updateDomain, deleteDomain } from "./domain.controller";
import { ZodValidate } from "../../utils/zod.middleware";
import { newDomainSchema, updateDomainSchema, deleteDomainSchema } from "./domain.schema";

const domainRouter = express.Router();

domainRouter.get("/", getAllDomains);
domainRouter.post("/", ZodValidate(newDomainSchema), createNewDomain);
domainRouter.put("/", ZodValidate(updateDomainSchema), updateDomain);
domainRouter.delete("/:id?", ZodValidate(deleteDomainSchema), deleteDomain);

export { domainRouter };

import ProfileService from "./publisher.service";
import { getPublishersWithSearchType, newPublisherType, DeletePublisherType } from "./publisher.schema";
import { TypedRequestHandler } from "../../utils/zod.middleware";
import PublisherService from "./publisher.service";
import { Publisher } from "src/entity/Publisher";

export const getPublishersWithSearch: TypedRequestHandler<getPublishersWithSearchType> = async (req, res, next) => {
	try {
		const searchQuery = req.params.searchQuery || null;
		const publishers = await ProfileService.getPublishersWithSearch(searchQuery);
		res.status(200).send({ publishers });
		} catch (error) {
		next(error);
	}
};

export const createPublisher: TypedRequestHandler<newPublisherType> = async (req, res, next) => {
	try {
		const publisher = req.body;
		const newPublisher = await PublisherService.createPublisher(publisher);
		res.status(200).send({ newPublisher });
	} catch (error) {
		next(error);
	}
};

export const getAllPublishers: TypedRequestHandler<{}> = async (req, res, next) => {
	try {
		const publishers: Publisher[] = await PublisherService.getAllPublishers();
		res.status(200).send({ publishers });
	} catch (error) {
		next(error);
	}
};


export const deletePublisher: TypedRequestHandler<DeletePublisherType> = async (
	req,
	res,
	next
) => {
	try {
		const publisherId = req.params.id;
		await PublisherService.deletePublisher(publisherId);
		res.status(200).send({ success: true });
	} catch (error) {
		next(error);
	}
};
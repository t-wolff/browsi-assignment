import DomainService from "./domain.service";
import { NewDomainType, UpdateDomainType, DeleteDomainType } from "./domain.schema";
import { TypedRequestHandler } from "../../utils/zod.middleware";

export const getAllDomains: TypedRequestHandler<{}> = async (req, res) => {
	res.send(await DomainService.getAllDomains());
};

export const createNewDomain: TypedRequestHandler<NewDomainType> = async (
	req,
	res,
	next
) => {
	try {
		const newDomain = await DomainService.createDomain(req.body);
		res.status(200).send({ success: true, domainId: newDomain.id});
	} catch (error) {
		next(error);
	}
};

export const updateDomain: TypedRequestHandler<UpdateDomainType> = async (
	req,
	res,
	next
) => {
	try {
		const updatedDomain = await DomainService.updateDomain(req.body);
		res.status(200).send({ success: true, updatedDomain });
	} catch (error) {
		next(error);
	}
};

export const deleteDomain: TypedRequestHandler<DeleteDomainType> = async (
	req,
	res,
	next
) => {
	try {
		const domainId = req.params.id;
		await DomainService.deleteDomain(domainId);
		res.status(200).send({ success: true });
	} catch (error) {
		next(error);
	}
};
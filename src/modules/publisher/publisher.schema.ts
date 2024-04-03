import { z } from "zod";

export const getPublishersWithSearchSchema = z.object({
	params: z.object({
		searchQuery: z.string().optional(),
	}),
});

export const newPublisherSchema = z.object({
	body: z.object({
		name: z.string(),
		// domains: z.array(z.object({
		// 	name: z.string(),
		// 	desktop_ads_quantity: z.number(),
		// 	mobile_ads_quantity: z.number(),
		// 	owner: z.string(),
		// })).optional(),
	}),
});

export const deletePublisherSchema = z.object({
	params: z.object({
		id: z.string(),
	}),
});

export type getPublishersWithSearchType = z.infer<typeof getPublishersWithSearchSchema>;
export type newPublisherType = z.infer<typeof newPublisherSchema>;
export type DeletePublisherType = z.infer<typeof deletePublisherSchema>;


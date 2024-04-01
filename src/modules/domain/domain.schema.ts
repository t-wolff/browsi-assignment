import { z } from "zod";

export const newDomainSchema = z.object({
	body: z.object({
		name: z.string(),
		desktop_ads_qty: z.number(),
		mobile_ads_qty: z.number(),
		owner: z.string(),
	}),
});

export const updateDomainSchema = z.object({
	body: z.object({
		id: z.string(),
		name: z.string(),
		desktop_ads_qty: z.number(),
		mobile_ads_qty: z.number(),
	}),
});

export const deleteDomainSchema = z.object({
	params: z.object({
		id: z.string(),
	}),
});


export type NewDomainType = z.infer<typeof newDomainSchema>;
export type UpdateDomainType = z.infer<typeof updateDomainSchema>;
export type DeleteDomainType = z.infer<typeof deleteDomainSchema>;
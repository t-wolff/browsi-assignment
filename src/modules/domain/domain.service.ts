import { Domain } from '../../entity/Domain';
import { AppDataSource } from '../../data-source';
import { Publisher } from '../../entity/Publisher';
import { NewDomainType } from './domain.schema';

const domainRepository = AppDataSource.getRepository(Domain);
const publisherRepository = AppDataSource.getRepository(Publisher);

const DomainService = {
	getAllDomains: async () => {
		try {
			return await domainRepository.find({ relations: { owner: true } });
		} catch (error) {
			throw new Error(`${error as string} in getAllDomains`);
		}
	},
	createDomain: async (domain: NewDomainType['body']) => {
		try {
			const owner = await publisherRepository.findOne({ where: { id: domain.owner } });
			if (!owner) {
				throw new Error("Publisher not found");
			}

			const domainData = { ...domain, owner: owner };
			const newDomain = domainRepository.create(domainData);
			const createdDomain = await domainRepository.save(newDomain);
			return createdDomain;
		} catch (error) {
			throw new Error(`${error as string} in createDomain`);		}
	},
	getDomainByDomainID(id: string) {
		try {
			return domainRepository.findOneOrFail({ where: { id } })
		} catch (error) {
			throw new Error(`${error as string} in getDomainByDomainID`);
		}
	},
	updateDomain: async (domainData : Partial<Domain>) => {
		try {
			const domainId = domainData.id;
			const domain: Domain = await domainRepository.findOneOrFail({ where: { id : domainId } });
	
			const updatedDomain = domainRepository.merge(domain, domainData);
	
			await domainRepository.save(updatedDomain);
			return updatedDomain;
		} catch(error) {
			throw new Error(`${error as string} in updateDomain`);
		}
	},
	deleteDomain: async (id: string) => {
		try {
			const domain = await domainRepository.findOne({ where: { id } });
			if (domain) {
				await domainRepository.remove(domain);
			} else {
				throw new Error(`Domain with ID ${id} not found.`);
			}
		} catch (error) {
			throw new Error(`${error as string} in deleteDomain`);
		}
	},
};

export default DomainService;

import { Publisher } from '../../entity/Publisher'; 
import { AppDataSource } from '../../data-source';
import { newPublisherType } from './publisher.schema';

const publisherRepository = AppDataSource.getRepository(Publisher);

const PublisherService = {
	createPublisher: async (publisher: newPublisherType['body']) => {
		try {
			const newPublisher = publisherRepository.create(publisher);
			await publisherRepository.save(newPublisher);
		} catch (error) {
			throw new Error(error as string);
		}
	},
	getAllPublishers: async () => {
		const publishers: Publisher[] = await publisherRepository.find();
		return publishers;
	},
	getPublishersWithSearch: async (searchQuery: string | null) => {
		try {
			let publishers;
			if (searchQuery) {
				publishers = await publisherRepository.createQueryBuilder("publisher")
					.where("publisher.firstName LIKE :search", { search: `${searchQuery}%` })
					.orWhere("publisher.lastName LIKE :search", { search: `${searchQuery}%` })
					.getMany();
			} else {
				publishers = await publisherRepository.find();
			}
			return publishers;
		} catch (error) {
			throw new Error(error as string);
		}
	},
	deletePublisher: async (id: string) => {
		try {
			const Publisher = await publisherRepository.findOne({ where: { id } });
			if (Publisher) {
				await publisherRepository.remove(Publisher);
			} else {
				throw new Error(`Publisher with ID ${id} not found.`);
			}
		} catch (error) {
			throw error;
		}
	},
};

export default PublisherService;

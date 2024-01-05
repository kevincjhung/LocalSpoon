import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { parse } from 'path';

const prisma = new PrismaClient();

function createRandomString() {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let randomString = '';
	for (let i = 0; i < 10; i++) {
		randomString += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return randomString;
}

function createRandomInt() {
	return Math.floor(Math.random() * 1000);
}

function generateFakeJWT(): string{
  const header = faker.string.sample(90);  // Simulated header
  const payload = faker.string.sample(403); // Simulated payload
  const signature = faker.string.sample(45); // Simulated signature

  return `${header}.${payload}.${signature}`;
};

async function seedBuyer() {
	let first_name = faker.person.firstName();
	let last_name = faker.person.lastName();

	const createdBuyer = await prisma.buyer.create({
		data: {
			first_name,
			last_name,
			phone_number: faker.phone.number(),
			gender: ((Math.random() * 10) % 2 == 0) ? "Male" : "Female",
			date_of_birth: faker.date.between({ from: '1940-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z' }),
			Auth: {
				create: {
					email: `${first_name.toLowerCase()}.${last_name.toLowerCase() + String(Math.floor(Math.random() * 1000)).padStart(3, '0')}@gmail.com`,
					password: faker.internet.password({ length: 20, memorable: true }),
				},
			},
		},
	});
	console.log(createdBuyer)
}





async function seedStore() {
	let store_name = faker.company.name()
	let store_description = faker.lorem.paragraph()
	let supports_delivery = ((Math.random() * 10) % 2 == 0) ? true : false
	let store_delivery_radius = Math.floor(Math.random() * 3 + 1) * 10;
	let address = faker.location.streetAddress()
	let city = faker.location.city()
	let state_province = faker.location.state()
	let zipcode = faker.location.zipCode('#####')
	let country = faker.location.country()
	let product_name = faker.commerce.productName()
	let product_description = faker.commerce.productDescription()
	let product_price = parseFloat(faker.commerce.price())

	let seller_first_name = faker.person.firstName()
	let seller_last_name = faker.person.lastName()
	let seller_phone_number = faker.phone.number()
	let seller_gender = Math.random() > 0.5 ? "Male" : "Female"
	let seller_date_of_birth = faker.date.between({ from: '1940-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z' })
	let seller_auth_token_expiry = faker.date.future()
	
	const createdStore = await prisma.store.create({
		data: {
			store_name,
			store_description,
			supports_delivery,
			store_delivery_radius,
			address,
			city,
			state_province,
			zipcode,
			country,
			store_photos: {
				create: [
					{
						resource_url: faker.image.urlLoremFlickr({width: 640,height: 480})
					},
					{
						resource_url: faker.image.urlLoremFlickr({width: 640,height: 480})
					}
				]
			},
			Product: {
				create: [
					{
						name: product_name,
						description: product_description,
						price: product_price,
						ProductCategoryAssignment: {
							create: {
								ProductCategory: {
									create: {
										name: createRandomString(),
									},
								},
							},
						},
						// ! make this dynamic
						store_id: 1, 
						product_photos: {
							create: [
								{
									resource_url: "https://via.placeholder.com/" + createRandomInt(),
								},
								{
									resource_url: "https://via.placeholder.com/" + createRandomInt(),
								}
							]
						},
					}
				],
			},
			Seller: {
				create: {
					first_name: seller_first_name,
					last_name: seller_last_name,
					phone_number: seller_phone_number,
					gender: seller_gender,
					date_of_birth: seller_date_of_birth,
					Auth: {
						create: {
							email: `${seller_first_name.toLowerCase()}.${seller_last_name.toLowerCase() + String(Math.floor(Math.random() * 1000)).padStart(3, '0')}@gmail.com`,
							password: faker.internet.password({ length: 20, memorable: true }),
							token: generateFakeJWT(),
							token_expiry: new Date(seller_auth_token_expiry),
							is_active: true,
							is_email_verified: false,
							is_phone_verified: false,
							reset_token: null,
							reset_token_expiry: null,
							last_login: null,
						},
					}
				}
			},
		}
	})
}





async function seedData() {
	try {
		seedBuyer()
		seedStore();
		
		// seedPurchaseOrdersAndAssociations();
	} catch (error) {
		console.error('Error during seeding:', error);
	} finally {
		await prisma.$disconnect();
	}
}


try {
	seedData();
} catch (e) {
	console.error(e);
	prisma.$disconnect();
	process.exit(1);
} finally {
	console.log('...Seed Script Terminated \n Disconnected from Prisma Client');
}




























const purchaseOrderProductAssociationData: Prisma.PurchaseOrderProductAssociationCreateInput[] = [
	{
		quantity: 12,
		Product: {
			connect: {
				id: 1,
			},
		},
		PurchaseOrder: {
			create: {
				buyer_id: 1,
				purchase_date: new Date('2021-01-01'),
			}
		},
	}
]

async function seedPurchaseOrdersAndAssociations() {
	try {
		// Retrieve the IDs of all buyers and products
		const buyers = await prisma.buyer.findMany();
		const products = await prisma.product.findMany();

		if (buyers.length === 0 || products.length === 0) {
			console.warn('Unable to seed purchase orders. Buyers or products not found.');
			return;
		}

		// create a purchase order, select one of the buyers at random, and many of the products at random

		for (const purchaseOrderProductAssociation of purchaseOrderProductAssociationData) {

			const createdPurchaseOrderProductAssociation = await prisma.purchaseOrderProductAssociation.create({
				data: purchaseOrderProductAssociation,
			});

			console.log(`Created purchase order product association with id: ${createdPurchaseOrderProductAssociation.id}`);
		}
	} catch (error) {
		console.error('Error during seeding purchase orders and associations:', error);
	}
}


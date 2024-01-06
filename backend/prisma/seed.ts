import { PrismaClient, Prisma } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

function generateFakeJWT(): string{
  const header = faker.string.sample(90);  // Simulated header
  const payload = faker.string.sample(403); // Simulated payload
  const signature = faker.string.sample(45); // Simulated signature

  return `${header}.${payload}.${signature}`;
}

async function seedBuyer() {
	let first_name = faker.person.firstName();
	let last_name = faker.person.lastName();

	await prisma.buyer.create({
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
}

async function seedStore() {
	let store_name = faker.company.name()
	let supports_delivery = ((Math.random() * 10) % 2 == 0) ? true : false
	let store_delivery_radius = Math.floor(Math.random() * 3 + 1) * 10;
	let address = faker.location.streetAddress()
	let city = faker.location.city()
	let state_province = faker.location.state()
	let zipcode = faker.location.zipCode('#####')
	let country = faker.location.country()


	let seller_first_name = faker.person.firstName()
	let seller_last_name = faker.person.lastName()
	let seller_phone_number = faker.phone.number()
	let seller_gender = Math.random() > 0.5 ? "Male" : "Female"
	let seller_date_of_birth = faker.date.between({ from: '1940-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z' })
	let seller_auth_token_expiry = faker.date.future()
	

	const highestIdStore = await prisma.store.findFirst({
    orderBy: {
      id: 'desc',
    },
    select: {
      id: true,
    },
  });

  const nextStoreId = highestIdStore ? highestIdStore.id + 1 : 1;

	const createdStore = await prisma.store.create({
		data: {
			store_name,
			store_description: faker.lorem.paragraph(),
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
						name: faker.commerce.productName(),
						description: faker.lorem.paragraph(),
						price: parseFloat(faker.commerce.price()),
						ProductCategoryAssignment: {
							create: {
								ProductCategory: {
									create: {
										name: faker.commerce.department()
									},
								},
							},
						},
						store_id: nextStoreId,
						product_photos: {
							create: [
								{
									resource_url: faker.image.urlLoremFlickr({width: 640,height: 480})
								},
								{
									resource_url: faker.image.urlLoremFlickr({width: 640,height: 480})
								}
							]
						},
					},
					{
						name: faker.commerce.productName(),
						description: faker.lorem.paragraph(),
						price: parseFloat(faker.commerce.price()),
						ProductCategoryAssignment: {
							create: {
								ProductCategory: {
									create: {
										name: faker.commerce.department()
									},
								},
							},
						},
						store_id: nextStoreId,
						product_photos: {
							create: [
								{
									resource_url: faker.image.urlLoremFlickr({ width: 640, height: 480 })
								},
								{
									resource_url: faker.image.urlLoremFlickr({ width: 640, height: 480 })
								}
							]
						},
					},
					{
						name: faker.commerce.productName(),
						description: faker.lorem.paragraph(),
						price: parseFloat(faker.commerce.price()),
						ProductCategoryAssignment: {
							create: {
								ProductCategory: {
									create: {
										name: faker.commerce.department()
									},
								},
							},
						},
						store_id: nextStoreId,
						product_photos: {
							create: [
								{
									resource_url: faker.image.urlLoremFlickr({ width: 640, height: 480 })
								},
								{
									resource_url: faker.image.urlLoremFlickr({ width: 640, height: 480 })
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



/**
 * Generates a date, with the month skewed towards end of the year when ecommerce sales are highest. Data from Kaggle
 * Use a math library to implement this properly later
 */
function generateSkewedDate() {
	// The frequency of ecommerce sales in each month. Data from Kaggle.
	const monthFrequency = {"January": 9,"February":8 ,"March": 8,"April":9 ,"May": 11,"June": 9,"July": 9,"August": 10,"September": 9,"October": 12,"November":21,"December": 22};
	
	// Explicitly define the type for daysInEachMonth
	const daysInEachMonth: Record<string, number> = {"January": 31,"February":28 ,"March": 31,"April":30 ,"May": 31,"June": 30,"July": 31,"August": 31,"September": 30,"October": 31,"November":30,"December": 31};

	let eCommDistributionMonths: string[] = [];

	for (const [key, value] of Object.entries(monthFrequency)) {
			for (let i = 0; i < value; i++) {
					eCommDistributionMonths.push(key);
			}
	}
	
	  // years hardcoded for now
		const randomYear = [2022, 2023, 2024][Math.floor(Math.random() * 3)];

		// select a random month from eCommDistributionMonths
		let randomMonth: string = eCommDistributionMonths[Math.floor(Math.random() * eCommDistributionMonths.length)];
	
		// generate a random day in randomMonth
		let randomDay = Math.floor(Math.random() * daysInEachMonth[randomMonth]) + 1;
	
		return new Date(`${randomYear}-${randomMonth}-${randomDay}`);
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

		// console.log('buyers', buyers);
		// console.log('products', products);

		// if (buyers.length === 0 || products.length === 0) {
		// 	console.warn('Unable to seed purchase orders. Buyers or products not found.');
		// 	return;
		// }
		
		for(let i = 0; i < 1000; i++){

			console.log(generateSkewedDate())
		}

		// for (const purchaseOrderProductAssociation of purchaseOrderProductAssociationData) {

		// 	const createdPurchaseOrderProductAssociation = await prisma.purchaseOrderProductAssociation.create({
		// 		data: purchaseOrderProductAssociation,
		// 	});
		// }

	} catch (error) {
		console.error('Error during seeding purchase orders and associations:', error);
	}
}


/**
	- every product to be bought at least once
 	- most buyers have bought at least one product
 	- The purchase order data are spread over a period of time. 
 	- within the same year, sales climb from september to december, and then drop off in january.
 
 */















async function seedData() {
	try {
		// for(let i = 0; i < 50; i++){
		// 	await seedBuyer()
		// 	await seedStore()
		// }
		
		seedPurchaseOrdersAndAssociations();
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































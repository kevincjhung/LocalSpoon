import { PrismaClient, Prisma } from '@prisma/client';
import { create } from 'domain';

const prisma = new PrismaClient();

// TODO: This will be replaced with faker.js
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

const buyerData: Prisma.BuyerCreateInput[] = [
	{
		first_name: 'John',
		last_name: 'Doe',
		phone_number: '1234567890',
		gender: 'Male',
		date_of_birth: new Date('1990-01-01'),
		Auth: {
			create: {
				email: createRandomString() + '@gmail.com',
				password: 'securepassword',
			},
		},
	},
	{
		first_name: 'Alice',
		last_name: 'Smith',
		phone_number: '9876543210',
		gender: 'Female',
		date_of_birth: new Date('1985-05-15'),
		Auth: {
			create: {
				email: createRandomString() + '@gmail.com',
				password: 'strongpassword',
			},
		},
	}, {
		first_name: 'Jacques',
		last_name: 'Cousteau',
		phone_number: '9876543210',
		gender: 'Male',
		date_of_birth: new Date('1989-05-15'),
		Auth: {
			create: {
				email: createRandomString() + '@gmail.com',
				password: 'strongpassword',
			},
		},
	},
];

const storeData: Prisma.StoreCreateInput[] = [
	{
		store_name: createRandomString(),
		store_description: createRandomString(),
		supports_delivery: true,
		store_delivery_radius: 10,
		address: createRandomInt() + createRandomString() + " Street",
		city: "New York",
		state_province: "New York",
		zipcode: "12345",
		country: "USA",
		store_photos: {
			create: [
				{
					resource_url: "https://via.placeholder.com/" + createRandomInt(),
				},
				{
					resource_url: "https://via.placeholder.com/" + createRandomInt(),
				}
			]
		},
		Product: {  
			create: [
				{
					name: createRandomString(),
					description: createRandomString(),
					price: 10.00,
					ProductCategoryAssignment: {
						create: {
							ProductCategory: {
								create: {
									id: createRandomInt(),
									name: createRandomString(),
								},
							},
						},
					},
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
				first_name: createRandomString(),
				last_name: createRandomString(),
				phone_number: "609-345-3452",
				gender: "Male",
				date_of_birth: new Date('1990-01-01'),
				Auth: {
					create: {
						email: createRandomString() + "@example.com",
						password: "securepassword",
						token: "generatedtoken",
						token_expiry: new Date('2022-12-31T23:59:59'),
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
]

async function seedBuyers() {
	for (const buyer of buyerData) {
		const createdBuyer = await prisma.buyer.create({
			data: buyer,
		});
		console.log(`Created buyer with id: ${createdBuyer.id}`);
	}
	console.log('\n')
}

async function seedStore() {
	for (const store of storeData) {
		const createdStore = await prisma.store.create({
			data: store,
		});
		console.log(`Created store with id: ${createdStore.id}`);
	}
	console.log('\n')
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

		for(const purchaseOrderProductAssociation of purchaseOrderProductAssociationData) {

			const createdPurchaseOrderProductAssociation = await prisma.purchaseOrderProductAssociation.create({
				data: purchaseOrderProductAssociation,
			});

			console.log(`Created purchase order product association with id: ${createdPurchaseOrderProductAssociation.id}`);
		}
  } catch (error) {
    console.error('Error during seeding purchase orders and associations:', error);
  }
}

async function seedData() {
	try {
		seedBuyers();
		seedStore();
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

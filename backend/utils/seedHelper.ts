import { faker } from '@faker-js/faker';
import { create } from 'domain';
import { format } from 'path';



function createBuyer() {
	let first_name = faker.person.firstName()
	let last_name = faker.person.lastName()
	let phone_number = faker.phone.number()
	let gender = ((Math.random() * 10) % 2 == 0) ? "Male" : "Female"
	let date_of_birth = faker.date.between({ from: '1940-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z' })

	return {
		first_name,
		last_name,
		phone_number,
		gender,
		date_of_birth,
		Auth: createAuth(first_name, last_name)
	}
}


function createAuth(first_name: string, last_name: string) {
	return {
		email: `${first_name.toLowerCase()
			}.${last_name.toLowerCase()
			}@gmail.com`,
		password: faker.internet.password({ length: 20, memorable: true }),
	};
}

function createPhotos(numberOfPhotos: number, category: string) {
	if (numberOfPhotos < 1) {
		throw new Error('numberOfPhotos must be greater than 0')
	}

	let acceptedCategories = [
		'Toys', 'Music',
		'Movies', 'Home',
		'Shoes', 'Health',
		'Baby', 'Industrial',
		'Outdoors', 'Sports',
		'Computers', 'Jewelery',
		'Kids', 'Tools',
		'Garden', 'Clothing',
		'Automotive', 'Grocery',
		'Books', 'Games',
		'Beauty', 'Electronics'
	]


	let photos = []
	for (let i = 0; i < numberOfPhotos; i++) {
		photos.push({
			resources_url: faker.image.urlLoremFlickr({
				category,
				width: 640,
				height: 480
			})
		})
	}
	return photos
}




function createProduct(numberOfProducts: number = 1) {
	let productsToCreate = []

	for (let i = 0; i < numberOfProducts; i++) {
		productsToCreate.push({
			name: faker.commerce.productName(),
			description: faker.commerce.productDescription(),
			price: faker.commerce.price(),
			ProductCategoryAssignment: {
				create: {
					ProductCategory: {
						create: {
							name: faker.commerce.department()
						},
					},
				},
			},
			ProductPhotos: {
				create: createPhotos(3, 'fashion')
			}
		})
	}
	
	return productsToCreate
}

function createSeller(){
	 
	return {
		first_name:  faker.person.firstName(),
		last_name:  faker.person.lastName(),
		phone_number:  faker.phone.number(),
		gender:  ((Math.random() * 10) % 2 == 0) ? "Male" : "Female",
		date_of_birth:  faker.date.between({ from: '1940-01-01T00:00:00.000Z', to: '2023-01-01T00:00:00.000Z' })
	}
}

function createStore() {
	let store_name = faker.company.name()
	let store_description = faker.lorem.paragraph()
	let supports_delivery = ((Math.random() * 10) % 2 == 0) ? true : false
	let store_delivery_radius = Math.floor(Math.random() * 100)
	let address = faker.location.streetAddress()
	let city = faker.location.city()
	let state_province = faker.location.state()
	let zipcode = faker.location.zipCode('#####')
	let country = faker.location.country()
	let product = createProduct(10)


	return {
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
			create: createPhotos(3, 'business')
		},
		Product: {
			create: product
		},
	}
}


// console.log(JSON.stringify(createProduct(1), null, 2))


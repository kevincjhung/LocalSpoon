import { FormWrapper } from "./FormWrapper"

type StoreLocationData = {
	address: string,
	city: string,
	stateProvince: string,
	zipCode: string,
	country: string,
}

type StoreLocationFormProps = StoreLocationData & {
	updateFields: (fields: Partial<StoreLocationData>) => void
}

export function StoreLocationForm({
	address,
	city,
	stateProvince,
	zipCode,
	country,
	updateFields,
}: StoreLocationFormProps) {
	return (
		<FormWrapper title="Create A Store">
			<label>Address</label>
			<input
				required
				type="text"
				value={address}
				onChange={e => updateFields({ address: e.target.value })}
			/>
			<label>City</label>
			<input
				required
				type="text"
				value={city}
				onChange={e => updateFields({ city: e.target.value })}
			/>
			<label>State</label>
			<input
				required
				type="text"
				value={stateProvince}
				onChange={e => updateFields({ stateProvince: e.target.value })}
			/>
			<label>Zip Code</label>
			<input
				required
				type="text"
				value={zipCode}
				onChange={e => updateFields({ zipCode: e.target.value })}
			/>
			<label>Country</label>
			<input
				required
				type="text"
				value={country}
				onChange={e => updateFields({ country: e.target.value })}
			/>
		</FormWrapper>
	)
}
import { FormWrapper } from "./FormWrapper"
import { InputLabel, TextField } from "@mui/material"

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
		<FormWrapper title="Locate Your Store">
			<InputLabel htmlFor="outlined-adornment-storeAddress">
				Store Address
			</InputLabel>
			<TextField
				required
				id="storeAddress"
				label="Store Address"
				value={address}
				onChange={(e) => updateFields({ address: e.target.value })}
			/>
			<InputLabel htmlFor="outlined-adornment-storeCity">
				Store City
			</InputLabel>
			<TextField
				required
				id="storeCity"
				label="Store City"
				value={city}
				onChange={(e) => updateFields({ city: e.target.value })}
			/>
			<InputLabel htmlFor="outlined-adornment-storeState">
				Store State
			</InputLabel>
			<TextField
				required
				id="storeState"
				label="Store State"
				value={stateProvince}
				onChange={(e) => updateFields({ stateProvince: e.target.value })}
			/>
			<InputLabel htmlFor="outlined-adornment-storeZipCode">
				Store Zip Code
			</InputLabel>
			<TextField
				required
				id="storeZipCode"
				label="Store Zip Code"
				value={zipCode}
				onChange={(e) => updateFields({ zipCode: e.target.value })}
			/>
			<InputLabel htmlFor="outlined-adornment-storeCountry">
				Store Country
			</InputLabel>
			<TextField
				required
				id="storeCountry"
				label="Store Country"
				value={country}
				onChange={(e) => updateFields({ country: e.target.value })}
			/>
		</FormWrapper>
	)
}
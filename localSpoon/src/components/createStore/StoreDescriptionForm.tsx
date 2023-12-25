import { FormWrapper } from "./FormWrapper"
import { InputLabel, TextField, Autocomplete } from "@mui/material"

import { storeCategories } from "../../utils/storeCategories"

type StoreDescriptionData = {
	storeDescription: string,
	storeCategory: string[]
}

type StoreDescriptionFormProps = StoreDescriptionData & {
	updateFields: (fields: Partial<StoreDescriptionData>) => void
}


export function StoreDescriptionForm({
	storeDescription,
	storeCategory,
	updateFields,
}: StoreDescriptionFormProps) {

	const handleCategoryChange = (event: React.SyntheticEvent, value: string[]) => {
    updateFields({ storeCategory: value });
  }

	return (
		<FormWrapper title="Describe The Store">
			<InputLabel htmlFor="outlined-adornment-storeDescription">
				Store Description
			</InputLabel>
			<TextField
				id="outlined-textarea"
				multiline
				rows={4}
				value={storeDescription}
				onChange={(e) => updateFields({ storeDescription: e.target.value })}
			/>
			<InputLabel htmlFor="outlined-adornment-storeCategory">Store Category</InputLabel>
			<Autocomplete
				multiple
				id="outlined-adornment-storeCategory"
				options={storeCategories}
				value={storeCategory}
				onChange={handleCategoryChange}
				renderInput={(params) => (
					<TextField {...params} variant="outlined" label="Select Categories" />
				)}
			/>
		</FormWrapper>
	)
}
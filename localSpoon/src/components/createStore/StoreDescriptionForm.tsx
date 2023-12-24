import { FormWrapper } from "./FormWrapper"

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
	return (
		<FormWrapper title="Describe The Store">
			<label>Store Description</label>
			<input
				required
				type="text"
				value={storeDescription}
				onChange={e => updateFields({ storeDescription: e.target.value })}
			/>
			<label>Store Category</label>
			<input
				required
				type="text"
				value={storeCategory}
				onChange={(e) =>
          updateFields({ storeCategory: e.target.value.split(", ") }) // Split string into an array
        }
			/>
		</FormWrapper>
	)
}
import { FormWrapper } from "./FormWrapper"

type StoreDeliveryData = {
	isStoreDelivery: boolean     
  storeDeliveryRadius: number 
}

type StoreDeliveryFormProps = StoreDeliveryData & {
	updateFields: (fields: Partial<StoreDeliveryData>) => void
}

export function StoreDeliveryForm({
  isStoreDelivery,
  storeDeliveryRadius,
	updateFields,
}: StoreDeliveryFormProps) {
	return (
		<FormWrapper title="Set The Delivery">
			<label>Is Store Delivery?</label>
			<input
				required
				type="checkbox"
				checked={isStoreDelivery}
				onChange={e => updateFields({ isStoreDelivery: e.target.checked })}
			/>
			<label>Store Delivery Radius</label>
			<input
				required
				type="number"
				value={storeDeliveryRadius}
				onChange={e => updateFields({ storeDeliveryRadius: Number(e.target.value) })}
			/>
		</FormWrapper>
	)
}
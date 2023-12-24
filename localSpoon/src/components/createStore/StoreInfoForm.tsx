import { FormWrapper } from "./FormWrapper"

type StoreInfoData = {
	storeName: string
	phoneNumber: string
	email: string
	password: string
}

type StoreInfoFormProps = StoreInfoData & {
	updateFields: (fields: Partial<StoreInfoData>) => void
}

export function StoreInfoForm({
	storeName, 
	phoneNumber, 
	email, 
	password,
	updateFields,
}: StoreInfoFormProps) {
	return (
		<FormWrapper title="Create A Store">
			<label>StoreName</label>
			<input 
				required
				type="text"
				value={storeName}
				onChange={e => updateFields({ storeName: e.target.value })}
			/>
			<label>PhoneNumber</label>
			<input
				required
				type="text"
				value={phoneNumber}
				onChange={e => updateFields({ phoneNumber: e.target.value })}
			/>
			<label>Email</label>
			<input
				autoFocus
				required
				type="email"
				value={email}
				onChange={e => updateFields({ email: e.target.value })}
			/>
			<label>Password</label>
			<input
				required
				type="password"
				value={password}
				onChange={e => updateFields({ password: e.target.value })}
			/>
		</FormWrapper>
	)
}
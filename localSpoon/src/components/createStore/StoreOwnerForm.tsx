import { FormWrapper } from "./FormWrapper"
import { useState } from "react"
import { InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material"
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


type StoreOwnerData = {
	storeName: string
	phoneNumber: string
	email: string
	password: string
}

type StoreOwnerFormProps = StoreOwnerData & {
	updateFields: (fields: Partial<StoreOwnerData>) => void
}

export function StoreOwnerForm({
	storeName,
	phoneNumber,
	email,
	password,
	updateFields,
}: StoreOwnerFormProps) {

	const [showPassword, setShowPassword] = useState(false);


	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};


	return (
		<FormWrapper title="Create Your Store">
			<InputLabel htmlFor="outlined-adornment-storeName">
				Store Name
			</InputLabel>
			<TextField
				required
				id="storeName"
				label="Store Name"
				value={storeName}
				onChange={(e) => updateFields({ storeName: e.target.value })}
			/>
			<InputLabel htmlFor="outlined-adornment-phoneNumber">
				Phone Number
			</InputLabel>
			<TextField
				label="PhoneNumber"
				required
				fullWidth
				value={phoneNumber}
				onChange={(e) => updateFields({ phoneNumber: e.target.value })}
			/>
			<InputLabel htmlFor="outlined-adornment-email">
				Email
			</InputLabel>
			<TextField
				label="Email"
				required
				fullWidth
				type="email"
				value={email}
				onChange={(e) => updateFields({ email: e.target.value })}
			/>
			<InputLabel htmlFor="outlined-adornment-password">
				Password
			</InputLabel>
			<OutlinedInput
				id="outlined-adornment-password"
				type={showPassword ? 'text' : 'password'}
				label="Password"
				onChange={(e) => updateFields({ password: e.target.value })}
				value={password}
				endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
			/>
		</FormWrapper>
	)
}
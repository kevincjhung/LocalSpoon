import { useState } from "react"

import { FormWrapper } from "./FormWrapper"
import Switch from '@mui/material/Switch';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


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
	const [deliveryRadius, setDeliveryRadius] = useState(0);
	
	const handleChange = (event: SelectChangeEvent<number>) => {
		setDeliveryRadius(event.target.value as number);
		updateFields({ storeDeliveryRadius: event.target.value as number });
	};


	return (
		<div className="mt-4">
      <FormWrapper title="Set The Delivery">
        <label>Does Your Store Deliver?</label>
        <Switch
          checked={isStoreDelivery}
          onChange={(e) => updateFields({ isStoreDelivery: e.target.checked })}
          size="medium"
        />
        {isStoreDelivery && (
          <>
            <label>Store Delivery Radius</label>
            <Select
              labelId="store-delivery-radius-label"
              id="store-delivery-radius"
              value={deliveryRadius}
              label="Store Delivery Radius"
              onChange={handleChange}
            >
              <MenuItem value={10}>10 km</MenuItem>
              <MenuItem value={20}>20 km</MenuItem>
              <MenuItem value={30}>30+ km</MenuItem>
            </Select>
          </>
        )}
      </FormWrapper>
    </div>
	)
}
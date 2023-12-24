import { FormWrapper } from "./FormWrapper";

type StoreSubmissionData = {
  // Add properties based on the data you want to display
  storeName: string;
  phoneNumber: string;
  email: string;
  address: string;
  city: string;
  stateProvince: string;
  zipCode: string;
  country: string;
  storeDescription: string;
  storeCategory: string[];
  isStoreDelivery: boolean;
  storeDeliveryRadius: number;
};

type StoreSubmissionFormProps = {
  data: StoreSubmissionData;
  
};

export function StoreSubmissionConfirmationForm({ data }: StoreSubmissionFormProps) {
  return (
    <FormWrapper title="Confirm the data">
        <ul>
          <li>Store Name: {data.storeName}</li>
          <li>Phone Number: {data.phoneNumber}</li>
          <li>Email: {data.email}</li>
          <li>Address: {data.address}</li>
					<li>City: {data.city}</li>
					<li>State: {data.stateProvince}</li>
					<li>Zip Code: {data.zipCode}</li>
					<li>Country: {data.country}</li>
					<li>Store Description: {data.storeDescription}</li>
					<li>Store Category: {data.storeCategory}</li>
					<li>Is Store Delivery: {data.isStoreDelivery}</li>
					<li>Store Delivery Radius: {data.storeDeliveryRadius}</li>
        </ul>
    </FormWrapper>
  );
}

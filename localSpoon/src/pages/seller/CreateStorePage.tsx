// Library imports
// Library Imports
import { useState, FormEvent } from 'react'

// Component Imports
import { StoreInfoForm } from '../../components/createStore/StoreInfoForm';
import { StoreLocationForm } from '../../components/createStore/StoreLocationForm';
import { StoreDescriptionForm } from '../../components/createStore/StoreDescriptionForm';
import { StoreDeliveryForm } from '../../components/createStore/StoreDeliveryForm';
import { StoreSubmissionConfirmationForm } from '../../components/createStore/StoreSubmissionConfirmationForm';

// Custom Hook
import { useMultistepForm } from '../../hooks/useMultistepForm';


// type FormData = {
//   firstName: string     // userData
//   lastName: string      // userData
//   age: string           // userData
//   street: string        // addressData
//   city: string          // addressData
//   state: string         // addressData
//   zip: string           // addressData
//   email: string         // accountData
//   password: string      // accountData
// }

type LocalSpoonFormData = {
  storeName: string           // StoreInfoData
  phoneNumber: string 
  email: string 
  password: string 
  address: string             // StoreLocationData
  city: string 
  stateProvince: string 
  zipCode: string 
  country: string 
  storeDescription: string    // storeDescriptionData 
  storeCategory: string[] 
  isStoreDelivery: boolean      // storeDeliveryData
  storeDeliveryRadius: number 
}
const LocalSpoonInitialData: LocalSpoonFormData = {
  storeName: "",
  phoneNumber: "",
  email: "",
  password: "",
  address: "",
  city: "",
  stateProvince: "",
  zipCode: "",
  country: "",
  storeDescription: "",
  storeCategory: [],
  isStoreDelivery: false,
  storeDeliveryRadius: 0,
}




export default function CreateStorePage() {
  const [data, setData] = useState(LocalSpoonInitialData)

  function updateFields(fields: Partial<LocalSpoonFormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <StoreInfoForm {...data} updateFields={updateFields} />,
      <StoreLocationForm {...data} updateFields={updateFields} />,
      <StoreDescriptionForm {...data} updateFields={updateFields} />,
      <StoreDeliveryForm {...data} updateFields={updateFields} />,
      <StoreSubmissionConfirmationForm data={data} />,
    ])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next()
    console.log(data)
  }

  return (
    <div
      style={{
        position: "relative",
        background: "orange",
        border: "1px solid black",
        padding: "2rem",
        margin: "1rem",
        borderRadius: ".5rem",
        fontFamily: "Arial",
        maxWidth: "max-content",
      }}
    >
      <form onSubmit={onSubmit}>
        <div style={{ position: "absolute", top: ".5rem", right: ".5rem" }}>
          {currentStepIndex + 1} / {steps.length}
        </div>
        {step}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: ".5rem",
            justifyContent: "flex-end",
          }}
        >
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}
          <button type="submit">{isLastStep ? "Finish" : "Next"}</button>
        </div>
      </form>
    </div>
  )
}
// Library Imports
import { useState, FormEvent } from 'react'

// MaterialUI Imports
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress'; // Import LinearProgress
import { Typography } from '@mui/material';

// Component Imports
import { StoreOwnerForm } from '../../components/createStore/StoreOwnerForm';
import { StoreLocationForm } from '../../components/createStore/StoreLocationForm';
import { StoreDescriptionForm } from '../../components/createStore/StoreDescriptionForm';
import { StoreDeliveryForm } from '../../components/createStore/StoreDeliveryForm';
import { StoreSubmissionConfirmationForm } from '../../components/createStore/StoreSubmissionConfirmationForm';



// Custom Hook
import { useMultistepForm } from '../../hooks/useMultistepForm';

type LocalSpoonFormData = {
  storeName: string           // StoreOwnerData
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
  isStoreDelivery: boolean    // storeDeliveryData
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
      <StoreOwnerForm {...data} updateFields={updateFields} />,
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

  const progress = (currentStepIndex / (steps.length - 1)) * 100; // Calculate progress percentage

  return (
    <div
      style={{
        position: "relative",
        padding: "2rem",
        margin: "1rem",
        border: "1px solid black",
        borderRadius: ".5rem",
        width: "max-content",
      }}
    >
      <form onSubmit={onSubmit}>
        <LinearProgress variant="determinate" value={progress} /> {/* Progress Bar */}
        <Typography variant="body2" align="center" gutterBottom>
          Step {currentStepIndex + 1} of {steps.length}
        </Typography>
        {step}
        <div
          style={{
            display: 'flex',
            marginTop: '1rem',
            gap: '.5rem',
            justifyContent: 'flex-end',
          }}
        >
          {!isFirstStep && (
            <Button
              type="button"
              onClick={back}
              variant="outlined"
            >
              Back
            </Button>
          )}
          <Button
            type="submit"
            variant="outlined"
          >
            {isLastStep ? "Finish" : "Next"}
          </Button>
        </div>
      </form>
    </div>
  )
}
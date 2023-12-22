import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function CreateStorePage() {
  return (
    <div>
      <h1 className="m-3">Create a Store</h1>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          required
          id="outlined-required"
          label="this is the label"
          defaultValue="this is the default value"
        />

      </Box>
    </div>
  )
}

/**
 * TODO: plan out what you will have on each part of the multipart form
 * TODO: have a progress bar at the top
 * 
 * store name
 * phone number
 * email address
 * password (do validation at a later time)
 * 
 * address of business 
 *    - see if there is some validation api at a later time
 *    - show it on a map, at a later time
 * 
 * types of products you offer
 * deliveries/in store pickup
 * add photo
 * 
 * submission and confirmation message
 * 
 */
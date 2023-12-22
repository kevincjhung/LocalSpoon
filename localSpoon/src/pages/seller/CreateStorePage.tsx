// Library imports
import React, { useState } from 'react';

// MaterialUI Imports
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';



export default function CreateStorePage() {
  const [showPassword, setShowPassword] = useState(false);


  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <h1 className="m-3">Create a Store</h1>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        className="m-3"
      >
        <TextField
          required
          id="storeName"
          label="Store Name"

        />
        <TextField
          required
          id="storePhoneNumber"
          label="Phone Number"
        />
        <TextField
          required
          id="email"
          label="Email"
        />
        <FormControl  variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
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
            label="Password"
          />
        </FormControl>
      </Box>
    </div>
  )
}


/**
 * TODO: have a progress bar at the top
 * 
 * form - page 1
 *   - store name
 *   - phone number
 *   - email address
 *   - password (do validation at a later time)
 * 
 * form - page 2
 *   - address of business 
 *     - stretch goal: see if there is some validation api at a later time
 *     - show it on a map, at a later time
 * 
 * form - page 3
 *   - types of products you offer
 * 
 * form - page 4 
 *  deliveries/in store pickup
 *  add photo
 * 
 * submission and confirmation message, with loading indicator
 * 
 */
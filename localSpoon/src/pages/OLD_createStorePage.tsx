// Library imports
import React, { useState } from 'react';

// MaterialUI Imports
import TextField from '@mui/material/TextField';


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
      <div className="form-part-1 bg-orange-100">
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
        <InputLabel htmlFor="outlined-adornment-password">
          Password
        </InputLabel>
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
        <button type="button">Next</button>
        <button type="button">Previous</button>
      </div>

      <div className="form-part-2 bg-red-100">
        <h1>Your Store Address</h1>
        <p>
          This lets us know that your business is authorized for the safety of your customers
        </p>
        <TextField
          required
          id="storeAddress"
          label="Address"
        />
        <TextField
          required
          id="storeCity"
          label="City"
        />
        <TextField
          required
          id="storeProvince"
          label="Province"
        />
        <TextField
          required
          id="storeZip"
          label="Zip Code"
        />
        <button type="button">Next</button>
        <button type="button">Previous</button>
      </div>

      <div className="form-part-3 bg-green-100">
        <h1>
          What do you sell?
        </h1>
        <p>
          Insert Multiple Selection UI Here
        </p>
        <button type="button">Next</button>
        <button type="button">Previous</button>
      </div>

      <div className="form-part-4 bg-blue-100">
        <h1>
          Do you want to offer deliveries or pick up  in-store only?
        </h1>
        <button type="button">Next</button>
        <button type="button">Previous</button>
      </div>

      <div className='form-part-5 bg-yellow-100'>
        <h1>What Does Your Ship Look Like?</h1>
        <p>
          Insert Image Upload UI Here
        </p>
        <button type="button">Next</button>
        <button type="button">Previous</button>
      </div>

      <div className="form-part-6 bg-pink-100">
        <h1>Form Info Confirmation UI</h1>
        <p>
          Insert Form Info Confirmation UI Here
        </p>
        <button type="button">Previous</button>
        <button type="button">Submit</button>
      </div>
    </div>
  )
}


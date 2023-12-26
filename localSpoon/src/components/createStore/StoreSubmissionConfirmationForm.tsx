import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Typography } from "@mui/material";

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

export function StoreSubmissionConfirmationForm({
  data,
}: StoreSubmissionFormProps) {
  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper", maxWidth: "500px" }}>
      <List>
        <Typography variant="h4" component="h4">
          Store Submission Confirmation
        </Typography>
        <ListItem>
          <ListItemText
            primary={`Store Name: ${data.storeName}`}

          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Phone Number: ${data.phoneNumber}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Email: ${data.email}`}

          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Address: ${data.address}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`City: ${data.city}`}
            
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`State: ${data.stateProvince}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Zip Code: ${data.zipCode}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Country: ${data.country}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Store Description: ${data.storeDescription}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Store Category: ${data.storeCategory.join(", ")}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Is Store Delivery: ${data.isStoreDelivery}`}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Store Delivery Radius: ${data.storeDeliveryRadius}`}
          />
        </ListItem>
      </List>
      <Divider />
    </Box>
  );
}
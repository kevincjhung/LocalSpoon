import { Button } from "@mui/material";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // This ensures the container takes the full viewport height
      }}
    >
      <img
        src="/localscoop-logo.svg"
        alt="Company Logo"
        style={{ maxWidth: "100%", height: "auto", marginBottom: "8px" }}
      />
      <Button
        variant="contained"
        size="large"
        color="secondary"
        href="/seller"
        style={{ marginTop: "8px" }}
      >
        For Businesses
      </Button>
      <Button
        variant="contained"
        size="large"
        color="primary"
        href="/seller"
        style={{ marginTop: "8px" }}
      >
        For Customers
      </Button>
    </div>
  );
}

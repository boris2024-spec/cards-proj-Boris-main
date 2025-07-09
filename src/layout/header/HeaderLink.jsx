import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function HeaderLink({ to, label }) {
  return (
    <>
      <Link to={to}>
        <Button sx={{ color: "white" }}>
          <Typography>{label}</Typography>
        </Button>
      </Link>
    </>
  );
}

export default HeaderLink;

import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormButton from "./FormButton";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import LoopIcon from "@mui/icons-material/Loop";

const Form = ({
  title = "",
  onSubmit,
  onReset,
  validateForm,
  to = "/",
  color = "inherit",
  spacing = 1,
  styles = {},
  children,
}) => {
  const navigate = useNavigate();

  return (
    <Box
      component="form"
      color={color}
      sx={{ mt: 2, p: { xs: 1, sm: 2 }, ...styles }}
      onSubmit={e => { e.preventDefault(); onSubmit(); }}
      autoComplete="off"
      noValidate
    >
      <Typography align="center" variant="h5" component="h1" mb={2}>
        {title.toUpperCase()}
      </Typography>

      <Grid container spacing={spacing}>
        {children}
      </Grid>

      <Grid container spacing={1} my={2} direction="row" width="100%" justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={4} display="flex" justifyContent="center">
          <FormButton
            node="cancel"
            color="error"
            component="div"
            variant="outlined"
            size="large"
            onClick={() => navigate(to)}
          />
        </Grid>
        <Grid item xs={12} sm={4} display="flex" justifyContent="center">
          <FormButton
            node={<LoopIcon />}
            variant="outlined"
            component="div"
            size="large"
            onClick={onReset}
          />
        </Grid>
        <Grid item xs={12} sm={4} display="flex" justifyContent="center">
          <FormButton
            node="Submit"
            onClick={e => { e.preventDefault(); onSubmit(); }}
            disabled={!validateForm ? false : !validateForm()}
            size="large"
            variant="contained"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Form;

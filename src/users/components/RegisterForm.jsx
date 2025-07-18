import {
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
  Container
} from "@mui/material";

import useForm from "../../hooks/useForm";
import Form from "../../components/Form";
import axios from "axios";
import signupSchema from "../models/signupSchema";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import normalizeUser from "../helpers/normalization/normalizeUser";

const handleSignup = async (userDetails) => {
  const userDetailsForServer = normalizeUser(userDetails);
  try {
    const response = await axios.post(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
      userDetailsForServer
    );
    console.log(response);
  } catch (error) {
    console.log(error);
    if (error.response) {
      alert(error.response.data);
    }
  }
};

function RegisterForm() {
  const { formDetails, errors, handleChange, handleSubmit } = useForm(
    initialSignupForm,
    signupSchema,
    handleSignup
  );

  return (

    <Container maxWidth="sm">
      <Form
        onSubmit={handleSubmit}
        onReset={() => { }}
        title={"sign up form"}
        styles={{

          maxWidth: "none",
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          p: 5,
          mx: 'auto'
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="first"
              label="First Name"
              fullWidth
              variant="outlined"
              error={Boolean(errors.first)}
              helperText={errors.first}
              onChange={handleChange}
              value={formDetails.first}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="middle"
              label="Middle Name"
              fullWidth
              variant="outlined"
              error={Boolean(errors.middle)}
              helperText={errors.middle}
              onChange={handleChange}
              value={formDetails.middle}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="last"
              label="Last Name"
              fullWidth
              variant="outlined"
              error={Boolean(errors.last)}
              helperText={errors.last}
              onChange={handleChange}
              value={formDetails.last}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="phone"
              label="Phone"
              fullWidth
              variant="outlined"
              type="tel"
              error={Boolean(errors.phone)}
              helperText={errors.phone}
              onChange={handleChange}
              value={formDetails.phone}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              type="email"
              error={Boolean(errors.email)}
              helperText={errors.email}
              onChange={handleChange}
              value={formDetails.email}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="password"
              label="Password"
              fullWidth
              variant="outlined"
              type="password"
              error={Boolean(errors.password)}
              helperText={errors.password}
              onChange={handleChange}
              value={formDetails.password}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="url"
              label="Image URL"
              fullWidth
              variant="outlined"
              error={Boolean(errors.url)}
              helperText={errors.url}
              onChange={handleChange}
              value={formDetails.url}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="alt"
              label="Image Alt"
              fullWidth
              variant="outlined"
              error={Boolean(errors.alt)}
              helperText={errors.alt}
              onChange={handleChange}
              value={formDetails.alt}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="state"
              label="State"
              fullWidth
              variant="outlined"
              error={Boolean(errors.state)}
              helperText={errors.state}
              onChange={handleChange}
              value={formDetails.state}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="country"
              label="Country"
              fullWidth
              variant="outlined"
              error={Boolean(errors.country)}
              helperText={errors.country}
              onChange={handleChange}
              value={formDetails.country}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="city"
              label="City"
              fullWidth
              variant="outlined"
              error={Boolean(errors.city)}
              helperText={errors.city}
              onChange={handleChange}
              value={formDetails.city}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="street"
              label="Street"
              fullWidth
              variant="outlined"
              error={Boolean(errors.street)}
              helperText={errors.street}
              onChange={handleChange}
              value={formDetails.street}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="houseNumber"
              label="House Number"
              fullWidth
              variant="outlined"
              error={Boolean(errors.houseNumber)}
              helperText={errors.houseNumber}
              onChange={handleChange}
              value={formDetails.houseNumber}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              name="zip"
              label="ZIP Code"
              fullWidth
              variant="outlined"
              error={Boolean(errors.zip)}
              helperText={errors.zip}
              onChange={handleChange}
              value={formDetails.zip}
            />
          </Grid>
          {/* Чекбокс для isBusiness */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="isBusiness"
                  checked={Boolean(formDetails.isBusiness)}
                  onChange={e => handleChange({
                    target: {
                      name: 'isBusiness',
                      value: e.target.checked
                    }
                  })}
                  color="primary"
                />
              }
              label="Signup as business"
              
            />
          </Grid>
        </Grid>

      </Form>
    </Container>

  );
}

export default RegisterForm;

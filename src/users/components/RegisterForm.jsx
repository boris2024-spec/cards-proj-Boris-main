import {
  Grid,
  FormControlLabel,
  Checkbox,
  TextField,
  Container
} from "@mui/material";
import { useEffect } from "react";

import useForm from "../../hooks/useForm";
import Form from "../../components/Form";
import axios from "axios";
import signupSchema from "../models/signupSchema";
import initialSignupForm from "../helpers/initialForms/initialSignupForm";
import normalizeUser from "../helpers/normalization/normalizeUser";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesDict";
import { useTheme } from "../../providers/CustomThemeProvider";

const handleSignup = async (userDetails, navigate) => {
  console.log('handleSignup - userDetails.isBusiness:', userDetails.isBusiness);
  console.log('handleSignup - full userDetails:', userDetails);
  const userDetailsForServer = normalizeUser(userDetails);
  console.log('handleSignup - normalized userDetails:', userDetailsForServer);
  try {
    const response = await axios.post(
      "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users",
      userDetailsForServer
    );
    console.log(response);
    // Переход на страницу логина после успешной регистрации
    navigate(ROUTES.login);
  } catch (error) {
    console.log(error);
    if (error.response) {
      alert(error.response.data);
    }
  }
};

function RegisterForm() {
  const navigate = useNavigate();
  const { isDark } = useTheme();

  const { formDetails, errors, handleChange, handleSubmit, reset } = useForm(
    initialSignupForm,
    signupSchema,
    (userDetails) => handleSignup(userDetails, navigate)
  );

  // Логируем текущее состояние isBusiness при каждом рендере
  console.log('RegisterForm render - formDetails.isBusiness:', formDetails.isBusiness);
  console.log('RegisterForm render - full formDetails:', formDetails);

  // Отслеживаем изменения isBusiness
  useEffect(() => {
    console.log('useEffect - isBusiness changed to:', formDetails.isBusiness);
  }, [formDetails.isBusiness]);

  return (

    <Container maxWidth="sm" >
      <Form

        onSubmit={handleSubmit}
        onReset={reset}
        title={"sign up form"}
        styles={{

          maxWidth: "none",
          backgroundColor: isDark ? '#1e1e1e' : 'white',
          borderRadius: 2,
          boxShadow: 5,
          p: 5,
          mx: 'auto'
        }}
      >
        <Grid container spacing={3}
       
          item sm={12} justifyContent="center" alignItems="center">
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
          <Grid item xs={12} sm={6} justifyContent={"flex-start"} >
            <FormControlLabel
              control={
                <Checkbox
                  name="isBusiness"
                  checked={Boolean(formDetails.isBusiness)}
                  onChange={e => {
                    // console.log('isBusiness checkbox clicked:', e.target.checked);
                    // console.log('Before handleChange - formDetails.isBusiness:', formDetails.isBusiness);
                    handleChange({
                      target: {
                        name: 'isBusiness',
                        value: e.target.checked
                      }
                    });
                    // Убираем этот лог, так как состояние обновляется асинхронно
                    // console.log('After handleChange - formDetails.isBusiness:', formDetails.isBusiness);
                  }}
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

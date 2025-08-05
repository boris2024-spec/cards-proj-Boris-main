import { TextField, Box } from "@mui/material";
import Form from "../../components/Form";
import useForm from "../../hooks/useForm";

import axios from "axios";
import loginSchema from "../models/loginSchema";
import initialLoginForm from "../helpers/initialForms/initialLoginForm";
import {
  getUser,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import { useCurrentUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const { setToken, setUser } = useCurrentUser();
  const navigate = useNavigate();

  const handleLogin = async (user) => {
    try {
      const response = await axios.post(
        "https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users/login",
        user
      );
      console.log(response);
      setTokenInLocalStorage(response.data);
      setToken(response.data);
      setUser(getUser());
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("The login failed");
    }
  };

  const { formDetails, errors, handleChange, handleSubmit } = useForm(
    initialLoginForm,
    loginSchema,
    handleLogin
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      <Form
      
        onSubmit={handleSubmit}
        onReset={() => { }}
        title={"sign in form"}
        styles={{ maxWidth: "600px" }}
      >
        <TextField
          fullWidth
          variant="outlined"
          name="email"
          label="email"
          error={errors.email}
          onChange={handleChange}
          value={formDetails.email}
        />
        <TextField
          fullWidth
          variant="outlined"
          name="password"
          label="password"
          error={errors.password}
          onChange={handleChange}
          value={formDetails.password}
          type="password"
        />
      </Form>
    </Box>
  );
}

export default LoginForm;

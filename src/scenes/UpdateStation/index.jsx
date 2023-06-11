import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const UpdateStation = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    (async () => {
      await fetch('', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
   
    })();
    alert('Updated Station')

  };

  return (
    <Box m="20px">
      <Header title="Update Station"  />

      <Formik
        onSubmit={(values, {resetForm}) => {
          handleFormSubmit(values)
          resetForm({values:''})
        }}
        initialValues={initialValues}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="lat"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.lat}
                name="lat"
                error={!!touched.lat && !!errors.lat}
                helperText={touched.lat && errors.lat}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="long"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.long}
                name="long"
                error={!!touched.long && !!errors.long}
                helperText={touched.long && errors.filongd}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="routeId "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.routeId}
                name="routeId"
                error={!!touched.routeId && !!errors.routeId}
                helperText={touched.routeId && errors.routeId}
                sx={{ gridColumn: "span 4" }}
              />
             
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Station
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  
  lat: "",
  long: "",
  routeId: "",
  stopName: "",
  stopId: "",
};

export default UpdateStation;

import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const CreateForm = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    (async () => {
      await fetch('https://metro-admin-gray.vercel.app/api/admin/addStation', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
   
    })();
  };

  return (
    <Box m="20px">
      <Header title="Create New Station" subtitle="Add a Station" />

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
                label="FID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.FID}
                name="FID"
                error={!!touched.FID && !!errors.FID}
                helperText={touched.FID && errors.FID}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="fid"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fid}
                name="fid"
                error={!!touched.fid && !!errors.fid}
                helperText={touched.fid && errors.fid}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Geometry "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.geometry}
                name="geometry"
                error={!!touched.geometry && !!errors.geometry}
                helperText={touched.geometry && errors.geometry}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Stop ID"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.stop_id}
                name="stop_id"
                error={!!touched.stop_id && !!errors.stop_id}
                helperText={touched.stop_id && errors.stop_id}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Stop Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.stop_name}
                name="stop_name"
                error={!!touched.stop_name && !!errors.stop_name}
                helperText={touched.stop_name && errors.stop_name}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Station
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
  FID: "",
  fid: "",
  geometry: "",
  stop_id: "",
  stop_name: "",
};

export default CreateForm;

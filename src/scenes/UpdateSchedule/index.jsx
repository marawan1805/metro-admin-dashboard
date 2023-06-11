import { Autocomplete, Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import { useEffect } from "react";

const UpdateSchedule = () => {

  const [stopIDs, setStopIDs] = useState([]);

  useEffect(() => {
    const getData = async () => {
      fetch('https://metro-admin-gray.vercel.app/api/admin') 
      .then(res => res.json())
      .then(data => {
        setStopIDs(data.map(element => {
          return {label: element.stop_id}
        }))
        
      })
    }
    getData()
  console.log(stopIDs);
  }, [])
  

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    (async () => {
      await fetch(`https://metro-admin-gray.vercel.app/api/admin/updateSchedule/${values.stop_id}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
   
    })();
    alert('Updated Schedule')

  };

  return (
    <Box m="20px">
      <Header title="Update Schedule" subtitle="Change The Schedule" />
      <h1>Make Sure To Fill All Fields</h1>
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
                label="stop_id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.stop_id}
                name="stop_id"
                error={!!touched.FID && !!errors.FID}
                helperText={touched.FID && errors.FID}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="route_id"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.route_id}
                name="route_id"
                error={!!touched.FID && !!errors.FID}
                helperText={touched.FID && errors.FID}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="direction"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.direction}
                name="direction"
                error={!!touched.fid && !!errors.fid}
                helperText={touched.fid && errors.fid}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="arrival_time "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.arrival_time}
                name="arrival_time"
                error={!!touched.geometry && !!errors.geometry}
                helperText={touched.geometry && errors.geometry}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="departure_time "
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.departure_time}
                name="departure_time"
                error={!!touched.geometry && !!errors.geometry}
                helperText={touched.geometry && errors.geometry}
                sx={{ gridColumn: "span 2" }}
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
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update Schedule
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
  route_id: "",
  direction: "",
  stop_id: "",
  stop_name: "",
  arrival_time: "",
  departure_time: "",
};

export default UpdateSchedule;

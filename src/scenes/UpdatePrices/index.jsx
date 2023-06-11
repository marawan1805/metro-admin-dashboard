import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const UpdatePrices = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit09 = (values) => {
    (async () => {
      await fetch('https://metro-admin-gray.vercel.app/api/admin/updatePrice', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
   
    })();
    alert('updated 0 - 9')
    console.log(values);
  };

  const handleFormSubmit916 = (values) => {
    (async () => {
      await fetch('https://metro-admin-gray.vercel.app/api/admin/updatePrice', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
   
    })();
    alert('updated 9 - 16')

  };

  const handleFormSubmit16 = (values) => {
    (async () => {
      await fetch('https://metro-admin-gray.vercel.app/api/admin/updatePrice', {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
   
    })();
    alert('updated 16+')

  };

  return (
    <Box>
    <Box m="20px">
      <Header title="Update Prices"  />

      <Formik
        onSubmit={(values, {resetForm}) => {
          handleFormSubmit09(values)
          resetForm({values:''})
        }}
        initialValues={initialValues09}
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
                <Box sx={{ gridColumn: "span 2" }}>
                     <h3>0 - 9</h3>
                </Box>
              
              <TextField
                fullWidth
                variant="filled"
                type='number'
                label="price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
              />
             
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update
              </Button>
            </Box>
          </form>
        )}
      </Formik>
              </Box>
    <Box m="20px">

      <Formik
        onSubmit={(values, {resetForm}) => {
          handleFormSubmit916(values)
          resetForm({values:''})
        }}
        initialValues={initialValues916}
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
                <Box sx={{ gridColumn: "span 2" }}>
                     <h3>9 - 16</h3>
                </Box>
              
              <TextField
                fullWidth
                variant="filled"
                type='number'
                label="price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
              />
             
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      </Box>

    <Box m="20px">

      <Formik
        onSubmit={(values, {resetForm}) => {
          handleFormSubmit16(values)
          resetForm({values:''})
        }}
        initialValues={initialValues16}
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
                <Box sx={{ gridColumn: "span 2" }}>
                     <h3>16+</h3>
                </Box>
              
              <TextField
                fullWidth
                variant="filled"
                type='number'
                label="price"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.price}
                name="price"
                error={!!touched.price && !!errors.price}
                helperText={touched.price && errors.price}
                sx={{ gridColumn: "span 2" }}
              />
             
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Update
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      </Box>

      
    </Box>
  );
};

const initialValues09 = {
  
  numOfStations: "0-9",
  price: "",

};

const initialValues916 = {
  
  numOfStations: "9-16",
  price: "",

};

const initialValues16 = {
  
  numOfStations: "16+",
  price: '',

};

export default UpdatePrices;

import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { licenseSchema } from "../../../utils/validation";

const DriverLicenseStepe = (props) => {
  const { setNext, completed, setCompleted } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(licenseSchema),
  });

  const onSubmit = ({ license, photo }) => {
    setCompleted({ ...completed, photo: photo[0], license });
    setNext(false);
  };

  return (
    <Box
      component="form"
      noValidate
      sx={{ paddingInline: "15rem" }}
      onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">
            Upload your driver's license photo and license ID
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            color="inherit"
            component="label"
            sx={{
              border: errors.photo?.message && "1px solid red",
              width: "223px",
              mr: "200px",
            }}>
            {"File here"}
            <input type="file" hidden {...register("photo")} />
          </Button>
        </Grid>
        <Grid item xs={6} sm={7}>
          <TextField
            label="License ID"
            required
            error={!!errors.license}
            helperText={errors.license?.message}
            {...register("license")}
          />
        </Grid>
        <Grid item xs={7} sm={2}>
          <Button
            sx={{
              height: "54px",
              bgcolor: "#192026",
              "&:hover": { bgcolor: "#252f39" },
            }}
            type="submit"
            variant="contained">
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DriverLicenseStepe;

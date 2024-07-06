import React from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import Footer from "../footer/Footer";
import "./TravelerInfo.css";

const TravelerInfo = ({ numReservedSeats }) => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    travelers: Yup.array().of(
      Yup.object().shape({
        fullName: Yup.string().required('*الاسم الكامل مطلوب'),
        nationalNumber: Yup.string()
          .matches(/^\d{11}$/, 'الرقم الوطني يجب أن يتكون من 11 رقم')
          .required('الرقم الوطني مطلوب'),
      })
    )
  });

  const formik = useFormik({
    initialValues: {
      travelers: Array.from({ length: numReservedSeats }, () => ({
        fullName: '',
        nationalNumber: ''
      }))
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      navigate("/check-in");
    }
  });

  const handleBackClick = () => {
    navigate("/bus");
  };

  return (
    <>
      <div className="TravelerInfo">
        <h2 className="title">معلومات المسافرين</h2>
        <form onSubmit={formik.handleSubmit}>
          {Array.from({ length: numReservedSeats }, (_, index) => (
            <div key={index} className="form">
              <h3 className="sectitel">كرسي رقم {index + 1}</h3>
              <Box
                sx={{
                  "& .MuiTextField-root": { m: 1, width: "25ch" },
                }}
              >
                <TextField
                  name={`travelers.${index}.nationalNumber`}
                  required
                  label="الرقم الوطني"
                  value={formik.values.travelers[index].nationalNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.travelers?.[index]?.nationalNumber && Boolean(formik.errors.travelers?.[index]?.nationalNumber)}
                  helperText={formik.touched.travelers?.[index]?.nationalNumber && formik.errors.travelers?.[index]?.nationalNumber}
                />

                <TextField
                  name={`travelers.${index}.fullName`}
                  required
                  label="الإسم الكامل"
                  value={formik.values.travelers[index].fullName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.travelers?.[index]?.fullName && Boolean(formik.errors.travelers?.[index]?.fullName)}
                  helperText={formik.touched.travelers?.[index]?.fullName && formik.errors.travelers?.[index]?.fullName}
                />
              </Box>
              <br />
            </div>
          ))}

          <div className="buttonContainer">
            <button
              type="button"
              className="btn"
              onClick={handleBackClick}
              style={{
                border: "none",
                color: "#fff",
                marginBottom: "3rem",
                marginTop: "1rem",
              }}
            >
              <span>العودة</span>
            </button>
            <button
              type="submit"
              className="btn"
              style={{
                border: "none",
                color: "#fff",
                marginBottom: "3rem",
                marginTop: "1rem",
              }}
            >
              <span>التالي</span>
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default TravelerInfo;

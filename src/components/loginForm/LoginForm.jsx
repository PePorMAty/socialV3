import React from "react";
import s from "./LoginForm.module.scss";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginMe } from "../../store/slices/authSlice";

const validateForm = Yup.object().shape({
  email: Yup.string().email("Invalid email!").required("Required"),
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  return (
    <Formik
      initialValues={{ email: "", password: "", rememberMe: false }}
      validationSchema={validateForm}
      onSubmit={(values, { setSubmitting }) => {
        dispatch(
          loginMe({
            email: values.email,
            password: values.password,
            rememberMe: values.rememberMe,
          })
        );
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form action="from" className={s.form}>
          <div className={s.err}>{(errors.email, error)}</div>
          <Field
            type="text"
            placeholder="Email"
            className={s.login}
            name={"email"}
          />

          <Field
            type="password"
            placeholder="Password"
            className={s.password}
            name={"password"}
          />
          <div className={s.checkWrapper}>
            <Field type="checkbox" className={s.checkbox} name="rememberMe" />
            <label className={s.text}>remember me</label>
          </div>

          <button className={s.btn} type={"submit"} disabled={isSubmitting}>
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;

import { useSignUpMutation } from "../store/api";
import { login } from "../store/authSlice";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Formik,Form as FormikForm, Field, ErrorMessage } from "formik";
import { Container, Form as BootstrapForm, Card, Row, Col } from "react-bootstrap";
import FormComponent from "../components/formComponent";
import picture from "../assets/signUp.jpg";
import { useTranslation } from "react-i18next";

const Registration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [signUp, { isLoading, error}] = useSignUpMutation();
  
  useEffect(() => {
    // Check if the user is already authenticated
    if (isAuthenticated) {
        navigate("/"); // Redirect to home page if authenticated
    }
}, [isAuthenticated, navigate]);

return (
    <FormComponent
        title={t('auth.signupTitle')}
        image={picture}
    >
        <Formik
                    initialValues={{ username: "", password: "" }}
                    validate={(values) => {
                      const errors = {};
                      if (!values.username) errors.username = t('auth.required');
                      if (!values.password) errors.password = t('auth.required');
                      return errors;
                    }}
                    onSubmit={async (values) => {
                      try {
                        const res = await signUp(values).unwrap();
                        dispatch(
                          login({
                            token: res.token,
                            username: res.username,
                          })
                        );
                        navigate("/");
                      } catch (e) {
                        console.error("Login failed:", e);
                      }
                    }}
                  >
                    {({ isSubmitting }) => (
                      // Formik's <Form> (aliased to FormikForm) wires submit+validation automatically
                      <FormikForm noValidate>
                        <BootstrapForm.Group className="mb-3" controlId="formUsername">
                          <Field
                            type="text"
                            name="username"
                            placeholder={t('auth.username')}
                            className="form-control"
                          />
                          <ErrorMessage name="username" component="div" className="text-danger" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group className="mb-3" controlId="formPassword">
                          <Field
                            type="password"
                            name="password"
                            placeholder={t('auth.password')}
                            className="form-control"
                          />
                          <ErrorMessage name="password" component="div" className="text-danger" />
                        </BootstrapForm.Group>

                        <button
                          type="submit"
                          className="btn btn-primary w-100"
                          disabled={isSubmitting || isLoading}
                        >
                          {isLoading ? t('auth.signingUp') : t('auth.signUpButton')}
                        </button>

                        {error && (
                          <div className="text-danger mt-2">
                            {t('auth.registrationFailed')}
                          </div>
                        )}
                      </FormikForm>
                    )}
        </Formik>
    </FormComponent>
  );
}
export default Registration;

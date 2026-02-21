import React , { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login as loginAction } from "../store/authSlice";
import { useLoginMutation } from "../store/api";
import picture from "../assets/avatar-DIE1AEpS.jpg";
import FormComonent from "../components/formComponent";
import { useTranslation } from "react-i18next";

function LogIn() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [login, { isLoading, error}] = useLoginMutation();
  useEffect(() => {
        // Check if the user is already authenticated
        if (isAuthenticated) {
            navigate("/"); // Redirect to home page if authenticated
        }
  }, [isAuthenticated, navigate]);
  
  return (
    <FormComonent
        title={t('auth.loginTitle')}
        image={picture}
        footer={
          <div>
            {t('auth.noAccount')}{" "}
            <Link to="/signup" className="link-primary">
              {t('auth.registration')}
            </Link>
          </div>
        }
    >
        <Formik
                    initialValues={{ username: "", password: "" }}
                    onSubmit={async (values) => {
                      try {
                        const res = await login(values).unwrap();
                        dispatch(
                          loginAction({
                            token: res.token,
                            username: res.username,
                          })
                        );
                        navigate("/");
                      } catch (e) {
                        // already handled by `error`, but keep for safety
                        console.error("Login failed:", e);
                      }
                    }}
                  >
                    {({ touched, errors }) => (
                      <Form noValidate>
                        {/* username */}
                        <div className="form-floating mb-3">
                          <Field
                            id="username"
                            name="username"
                            type="text"
                            className={`form-control ${
                              touched.username && errors.username
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder={t('auth.yourNick')}
                            autoComplete="username"
                            required
                          />
                          <label htmlFor="username">{t('auth.yourNick')}</label>
                          <ErrorMessage
                            name="username"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        {/* password */}
                        <div className="form-floating mb-4">
                          <Field
                            id="password"
                            name="password"
                            type="password"
                            className={`form-control ${
                              touched.password && errors.password
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder={t('auth.password')}
                            autoComplete="current-password"
                            required
                          />
                          <label htmlFor="password">{t('auth.password')}</label>
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        {/* server error */}
                        {error && (
                          <div className="alert alert-danger py-2" role="alert">
                            {t('auth.invalidCredentials')}
                          </div>
                        )}

                        {/* submit */}
                        <button
                          type="submit"
                          className="w-100 mb-3 btn btn-outline-primary"
                          disabled={isLoading}
                        >
                          {isLoading ? t('auth.loading') : t('auth.loginTitle')}
                        </button>
                      </Form>
                    )}
        </Formik> 
    </FormComonent>
  );
    
}

export default LogIn;

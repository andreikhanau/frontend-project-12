import { useSignUpMutation } from "../api/apiQueries.js";
import { useEffect } from "react";
import { useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { Form as BootstrapForm} from "react-bootstrap";
import FormComponent from "../components/formComponent";
import picture from "../assets/signUp.jpg";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "../stores/useStores.js";

const Registration = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => Boolean(state.token));
  const login = useAuthStore((state) => state.login);
  const { mutateAsync: signUp, isPending: isLoading, error } =
    useSignUpMutation();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { username: "", password: "", confirmPassword: "" },
  });
  
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

        <BootstrapForm
          noValidate
          onSubmit={handleSubmit(async (values) => {
            try {
              const res = await signUp({
                username: values.username,
                password: values.password,
              });
              login({
                token: res.token,
                username: res.username,
              });
              navigate("/");
            } catch (submitError) {
              console.error("Registration failed:", submitError);
            }
          })}//all form submission logic is handled by react-hook-form's handleSubmit
        >

          <BootstrapForm.Group className="mb-3" controlId="formUsername">
            <BootstrapForm.Control
              type="text"
              aria-label={t('auth.username')}
              placeholder={t('auth.username')}
              className={`form-control${errors.username ? " is-invalid" : ""}`}
              {...register("username", {
                required: t('auth.required'),
                minLength: {
                  value: 3,
                  message: t('auth.usernameMinLength'),
                },
                maxLength: {
                  value: 20,
                  message: t('auth.usernameMaxLength'),
                },
              })}
            />
            {errors.username && (
              <div className="text-danger">{errors.username.message}</div>
            )}
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3" controlId="formPassword">
            <BootstrapForm.Control
              type="password"
              aria-label={t('auth.password')}
              placeholder={t('auth.password')}
              className={`form-control${errors.password ? " is-invalid" : ""}`}
              {...register("password", {
                required: t('auth.required'),
                minLength: {
                  value: 6,
                  message: t('auth.passwordMinLength'),
                },
              })}
            />
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </BootstrapForm.Group>

          <BootstrapForm.Group className="mb-3" controlId="formConfirmPassword">
            <BootstrapForm.Control
              type="password"
              aria-label={t('auth.confirmPassword')}
              placeholder={t('auth.confirmPassword')}
              className={`form-control${errors.confirmPassword ? " is-invalid" : ""}`}
              {...register("confirmPassword", {
                required: t('auth.required'),
                validate: (value) =>
                  value === watch("password") || t('auth.passwordsMustMatch'),
              })}
            />
            {errors.confirmPassword && (
              <div className="text-danger">{errors.confirmPassword.message}</div>
            )}
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
        </BootstrapForm>
    </FormComponent>
  );
}
export default Registration;

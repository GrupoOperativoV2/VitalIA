import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from '../styles/register.module.css';

function Register() {
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (value) => {
    await signup(value);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/gestor");
  }, [isAuthenticated]);

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        {registerErrors.map((error, i) => (
          <Message key={i} message={error} />
        ))}
        <h1 className={styles.title}>Regístrate</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputField}>
            <Label htmlFor="username" className={styles.label}>
              Nombre:
            </Label>
            <br></br>
            <Input
              type="text"
              name="username"
              placeholder="Ingresa tu nombre"
              {...register("username")}
              autoFocus
            />
            {errors.username?.message && (
              <p className={styles.errorMessage}>{errors.username?.message}</p>
            )}
          </div>

          <div className={styles.inputField}>
            <Label htmlFor="email" className={styles.label}>
              Correo electrónico:
            </Label>
            <br></br>
            <Input
              name="email"
              placeholder="youremail@domain.tld"
              {...register("email")}
            />
            {errors.email?.message && (
              <p className={styles.errorMessage}>{errors.email?.message}</p>
            )}
          </div>

          <div className={styles.inputField}>
            <Label htmlFor="password" className={styles.label}>
              Contraseña:
            </Label>
            <br></br>
            <Input
              type="password"
              name="password"
              placeholder="********"
              {...register("password")}
            />
            {errors.password?.message && (
              <p className={styles.errorMessage}>{errors.password?.message}</p>
            )}
          </div>

          <div className={styles.inputField}>
            <Label htmlFor="confirmPassword" className={styles.label}>
              Confirma tu contraseña:
            </Label>
            <br></br>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="********"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword?.message && (
              <p className={styles.errorMessage}>
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <Button className={styles.button}>Enviar</Button>
        </form>
        <br></br>
        <div className={styles.prompt}>
          ¿Ya tienes cuenta?
          <Link to="/login" className={styles.loginLink}>
            Inicio de sesión
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default Register;

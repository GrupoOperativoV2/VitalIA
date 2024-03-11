import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";
import styles from '../styles/login.module.css';

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/gestor");
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.container}>
    <div className={styles.card}>
      {/* ... */}
      <h1 className={styles.title}>Inicio de sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputField}>
          <Label htmlFor="email" className={styles.label}>Correo electrónico:</Label>
          <Input
            className={styles.input}
            label="Ingresa tu correo"
            type="email"
            name="email"
            placeholder="youremail@example.com"
            {...register("email", { required: true })}
          />
          {errors.email && <p className={styles.errorMessage}>{errors.email.message}</p>}
        </div>

        <div className={styles.inputField}>
          <Label htmlFor="password" className={styles.label}>Contraseña:</Label>
          <br></br>
          <Input
            className={styles.input}
            type="password"
            name="password"
            placeholder="Ingresa su contraseña"
            {...register("password", { required: true, minLength: 6 })}
          />
          {errors.password && <p className={styles.errorMessage}>{errors.password.message}</p>}
        </div>

        <Button className={styles.button}>Entrar</Button>
      </form>
      <p className={`flex gap-x-2 justify-between ${styles.link}`}>
        ¿No tienes cuenta? <Link to="/register" className={styles.link}>Crea una</Link>
      </p>
    </div>
  </div>
  );
}

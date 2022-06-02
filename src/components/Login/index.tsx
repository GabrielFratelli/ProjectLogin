import React from "react";
import { Outlet } from "react-router-dom";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Icon from "../../assets/icon/google_icon.svg";

import {
  Container,
  ImageContainer,
  FormContainer,
  LoginContent,
  Title,
  Form,
  ButtonRemember,
  ButtonLogin,
  Footer,
} from "./styles";

type Inputs = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup
      .string()
      .email("Digite um Email válido")
      .required("Este campo é obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve ter no mínimo 8 caracteres")
      .required("Este campo é obrigatório"),
  })
  .required();

export const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  function onSubmit(userData: Inputs) {}

  return (
    <Container>
      <ImageContainer />
      <FormContainer>
        <LoginContent>
          <Title>
            <span>Welcome back</span>
            <strong>Login to your account</strong>
          </Title>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <span>Email</span>
              <input
                type="text"
                placeholder="Enter your Email"
                {...register("email", { required: true })}
              />
              {errors.email && <p>{errors.email?.message}</p>}
            </label>
            <label>
              <span>Password</span>
              <input
                type="password"
                placeholder="Inform your Password"
                {...register("password", { required: true })}
              />
              {errors.password && <p>{errors.password?.message}</p>}
            </label>
          </Form>
          <ButtonRemember>
            <input type="checkbox" />
            <span>Remember me</span>
            <button>Forgot password?</button>
          </ButtonRemember>
          <ButtonLogin>
            <button id="login" type="submit">
              Login Now
            </button>
            <button id="google" type="button">
              <img src={Icon} alt="Icon Google" />
              Or sign with google
            </button>
          </ButtonLogin>
        </LoginContent>
        <Footer>
          <span>Dont have an account?</span>
          <button>Join free today</button>
        </Footer>
      </FormContainer>
      <Outlet />
    </Container>
  );
};
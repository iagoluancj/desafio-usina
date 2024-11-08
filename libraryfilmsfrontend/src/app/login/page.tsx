/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

// Pagina de login robusta e com as devidas validações. 

import InputComponent from "@/components/primitivy/input";
import { Button, Elipse, FailedLogin, Form, FormAnimation, FormContainer, HelpPage, LoginContainer, LoginHeader, SignInUp } from "./styles";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import photoProfile from '../../assets/fotodeperfil.jpg'
import Image from "next/image";
import { SupaContext } from "@/Context/context";

export default function Login() {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true)
  const [signInUp, setSignInUp] = useState(false)
  const [failedLogin, setFailedLogin] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  // Confere se o email inserido segue o padrão aaa@aaa.aaa
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return 'Email é obrigatório.';
    } else if (!emailRegex.test(email)) {
      return 'Insira um e-mail válido.';
    } else {
      return '';
    }
  };

  const handleSignInUp = () => {
    if (signInUp) {
      setSignInUp(false)
    } else {
      setSignInUp(true)
    }
  }

  const handleFailedLogin = () => {
    if (failedLogin) {
      setFailedLogin(false)
    } else {
      setFailedLogin(true)
    }
  }

  const checkTokenValidity = async () => { //Verifica se o usuário já está logado, para trazer uma experiencia mais agradavél, onde o usuário não precisa ficar logando toda hora, mesmo que ainda esteja autenticado.
    const savedToken = Cookies.get('token');
    if (savedToken) {
      const response = await fetch(`http://localhost:3001/validar-token?token=${savedToken}`);
      const data = await response.json();
      if (response.ok && !data.error) {
        setIsUserLoggedIn(true);
        router.push('/auth/movies');
      }
    }
  };

  const registerUser = async () => { // Rota para registrar o usuário. 
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setSignInUp(false);

      } else {
        toast.error(data.message);

      }
    } catch (error) {
      toast.error(`Erro ao registrar o usuário ${error}`);

    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async () => { // Rota para realizar o login e suas devidas configurações (cookies e storage.)
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Cookies.set("token", data.token, { expires: 1, sameSite: 'strict' });
        Cookies.set("user", data.user.id, { expires: 1, sameSite: 'strict' });
        Cookies.set("first_access", data.user.first_access);
        sessionStorage.setItem('user', JSON.stringify(data.user));

        setIsUserLoggedIn(true);

        router.push('/auth/movies');

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(`Erro ao realizar o login ${error}`)
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => { // nada de muito diferente aqui. 
    event.preventDefault();
    setIsLoading(true)
    const emailError = validateEmail(formData.email);

    if (emailError) {
      toast.warn('Insira um e-mail válido.')
      setIsLoading(false)
      return;
    }

    if (signInUp) {
      setIsLoading(false)
      await registerUser();
    } else {
      setIsLoading(false)
      await loginUser();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {  // nada de muito diferente aqui. 
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem('user');

    if (storedUser) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false)
    }


    if (typeof window !== 'undefined') {
      checkTokenValidity();
    }

  }, []);

  return (
    <LoginContainer>
      {/* Algumas condições ternarias abaixo para trazer informações precisas ao usuário.*/}
      <Elipse>
        <Image src={photoProfile} alt='Foto de perfil'></Image>
      </Elipse>
      <LoginHeader>
        {isUserLoggedIn ? (
          <>
            <h1>Olá novamente, bora avaliar mais alguns filmes?!</h1>
            <p>Vamos, entre, temos coisa nova para você!</p>
          </>
        ) : (
          <>
            <h1>Avalie seus filmes favoritos e receba as recomendações perfeitas para seu gosto.</h1>
            <p>Bora descobrir um filme novo?!</p>
          </>
        )}
      </LoginHeader>
      <Form onSubmit={handleSubmit}>
        <FormContainer className={`form-container ${signInUp ? "rotate-positive" : "rotate-negative"}`}>
          {
            failedLogin ? (
              <HelpPage>
                <div>
                  <ul>
                    <li><p>{`>`}</p><span> Revise seu email utilizado.</span></li>
                    <li><p>{`>`}</p> <span>Verifique sua senha de acesso.</span></li>
                    <li><p>{`>`}</p> <span>Certifique-se de que sua conta está ativada.</span></li>
                    <li><p>{`>`}</p> <span>Verifique se o Caps Lock está ativado.</span></li>
                    <li><p>{`>`}</p><span> Tente limpar o cache do navegador.</span></li>
                  </ul>
                </div>
              </HelpPage>
            ) : (
              signInUp ? (
                <FormAnimation className={`form-container ${signInUp ? "rotate-positive" : "rotate-negative"}`}>
                  <InputComponent
                    label="Seu nome: "
                    maxLength={100}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <InputComponent
                    label="E-mail: "
                    maxLength={100}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <InputComponent
                    label="Password: "
                    maxLength={100}
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </FormAnimation>
              ) : (
                <>
                  <InputComponent
                    label="E-mail: "
                    maxLength={100}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <InputComponent
                    label="Password: "
                    maxLength={100}
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </>
              )
            )
          }
          {
          }
        </FormContainer>
        {
          failedLogin ? (
            <Button onClick={handleFailedLogin}>{isLoading ? 'Entrando...' : 'Voltar ao login'}</Button>
          ) : (
            <>
              <Button type="submit" disabled={isLoading || failedLogin}>{isLoading ? 'Entrando...' : 'Entrar'}</Button>
            </>
          )
        }
      </Form>
      {
        failedLogin ? (
          <span></span>
        ) : (
          <SignInUp onClick={handleSignInUp}>{signInUp ? 'Já possui cadastro? Faça login!' : 'Não possui cadastro? Faça-o aqui.'}</SignInUp>
        )
      }
      {
        signInUp ? (
          <span></span>
        ) : (
          <FailedLogin onClick={handleFailedLogin}>Falha ao realizar o login?</FailedLogin>
        )
      }
    </LoginContainer>
  );
}

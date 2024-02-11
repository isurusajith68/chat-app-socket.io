import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "../icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../icon/EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import logo from "../assets/logo.png";
import { useAuthContext } from "../context/AuthContext";

const formSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    isTouchField,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("api/auth/login", data, {
        withCredentials: true,
      });
      console.log(res.status);
      if (res.status === 200) {
        toast.success("Login successfully");
        localStorage.setItem("authUser", JSON.stringify(res.data));
        setAuthUser(res.data);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-96 flex-col gap-3"
      >
        <div className="flex flex-col items-center justify-center ">
          <img src={logo} alt="logo" className="h-24 w-24" />
          <h1 className="mb-3  font-serif text-xl font-bold text-black">
            Chat with your friends
          </h1>
        </div>
        <Input
          size="md"
          variant="filled"
          type="text"
          label="Email"
          placeholder="Enter your email"
          {...register("email")}
          touched={isTouchField}
          errorMessage={errors.email?.message}
        />

        <Input
          size="md"
          variant="filled"
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
          errorMessage={errors.password?.message}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
              ) : (
                <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
        />

        <Button
          type="submit"
          size="sm"
          className="bg-black text-white"
          isLoading={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
        <span className="text-sm font-semibold">
          Don't have an account?{" "}
          <Link to="/signup" className="font-normal text-black underline">
            Sign up
          </Link>
        </span>
      </form>
    </div>
  );
};
export default Login;

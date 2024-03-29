import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@nextui-org/react";
import { Radio, RadioGroup } from "@nextui-org/react";
import { EyeFilledIcon } from "../icon/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../icon/EyeSlashFilledIcon";
import { Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const formSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required().min(3),
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  gender: yup.string().required(),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { setAuthUser } = useAuthContext();
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("api/auth/register", data, {
        withCredentials: true,
      });

      toast.success("Register successfully");
      localStorage.setItem("authUser", JSON.stringify(res.data));
      setAuthUser(res.data);
      navigate("/");
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-96 flex-col gap-3 max-sm:px-10 "
      >
        <div className="flex flex-col items-center justify-center ">
          <h1 className="mb-3  font-serif text-xl font-bold text-black dark:text-white">
            Chat with your friends
          </h1>
        </div>
        <Input
          size="md"
          variant="filled"
          type="text"
          className="text-sm dark:text-white"
          label="Username"
          placeholder="Enter your username"
          {...register("username")}
          errorMessage={errors.username?.message}
        />
        <Input
          size="md"
          variant="filled"
          type="text"
          label="Email"
          className="text-sm dark:text-white"
          placeholder="Enter your email"
          {...register("email")}
          errorMessage={errors.email?.message}
        />

        <Input
          size="md"
          variant="filled"
          label="Password"
          className="text-sm dark:text-white"
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

        <Input
          size="md"
          variant="filled"
          className="text-sm dark:text-white"
          label="Confirm Password"
          placeholder="Enter your confirm password"
          {...register("confirmPassword")}
          errorMessage={errors.confirmPassword?.message}
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
        <RadioGroup
          label="Select your gender"
          orientation="horizontal"
          className="flex gap-2.5 text-sm"
          size="sm"
          {...register("gender")}
          errorMessage={errors.gender?.message}
        >
          <Radio value="male" {...register("gender")}>
            Male
          </Radio>
          <Radio value="female" {...register("gender")}>
            Female
          </Radio>
        </RadioGroup>
        <Button
          type="submit"
          size="sm"
          className="bg-black text-white"
          isLoading={isSubmitting}
        >
          Register
        </Button>
        <span className="text-sm font-semibold dark:text-white">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-normal text-black underline dark:text-white"
          >
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};
export default Register;

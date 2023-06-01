"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import {
  useCallback, useState
} from "react";
import {
  FieldValues,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import useRegisterModel from "@/app/hooks/useRegisterModel";
import useLoginModel from "@/app/hooks/useLoginModel";

import Model from "./Model";
import Header from "../Header";
import Input from "../Input";
import { toast } from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";

const RegisterModel = () => {
  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();

  const [isLoading, setIsLoading] = useState(false);


  const {
    register,
    handleSubmit,

    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })


  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios.post('/api/register', data).then((val) => {
      registerModel.onClose();
      toast.success("User Registered")
    }).catch((e) => {
      toast.error("Something Went Wrong")
    }).finally(() => {
      setIsLoading(false);
    })
  };

  const toggle = useCallback(() => {
    loginModel.onOpen()
    registerModel.onClose()
  }, [loginModel, registerModel])


  //Body
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Header title="Welcome to journee" subTitle="Create an account!" />
      <Input
        id={"name"}
        label={"Name"}
        register={register}
        required
        errors={
          errors
        } />
      <Input
        id={"email"}
        label={"Email"}
        register={register}
        required
        errors={
          errors
        } />

      <Input
        id={"password"}
        label={"Password"}
        type="password"
        register={register}
        required
        errors={
          errors
        } />
    </div>
  )

  //Footer

  const footerContent = (
    <div className="flex flex-col mt-3 gap-4">
      <hr />
      <Button
        outline
        icon={FcGoogle}
        label={"Continue with Google"}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        icon={AiFillGithub}
        label={"Continue with Github "}
        onClick={() => signIn('github')}
      />
      <div className="flex justify-center items-center text-neutral-500 text-sm ">
        <div>
          Already have an account?
        </div>
        <div
          onClick={toggle}
          className="
         ml-2
         text-black
         hover:underline
         cursor-pointer
          hover:text-blue-500">
          Login        </div>
      </div>
    </div>
  )
  return <Model
    disabled={isLoading}
    isOpen={registerModel.isOpen}
    title={"Register"}
    actionLabel={"Continue"}
    onClose={registerModel.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    secondaryAction={function (): void {
      throw new Error("Function not implemented.");
    }}

  />;
};

export default RegisterModel;

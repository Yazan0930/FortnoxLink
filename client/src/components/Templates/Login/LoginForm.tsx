import { useEffect } from "react";
import { Button, Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginProps } from "../../../interfaces/loginForm.interface";
import loginImg from "../../../assets/pictures/login/wallpapersden.com_trees-mountains-fog_6000x4000.jpg";
import { HoverBorderGradient } from "../../ui/HoverBorderGrdaient";
import { useLoginMutation } from "../../../hooks/api/useAuthApi";
import { FlipWords } from "../../ui/FlipWords";
import { useTranslation } from "react-i18next";
import { extractAuthCode, getCode } from "../../../services/api/authApi";

export default function LoginForm() {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<loginProps>({
    defaultValues: {
      code: "",
    }
  });

  const { mutate, isPending } = useLoginMutation(reset);

  const submitFormHandler: SubmitHandler<loginProps> = (data) => {
    mutate(data);
  };

  

  useEffect(() => {
    // Automatically handle the authorization code if redirected back
    const authCode = extractAuthCode();
    if (authCode) {
      mutate({ code: authCode }); // Trigger the login mutation with the extracted code
    }
  }, [mutate]);

  const handleLogin = () => {
    getCode();
  }

  const words = [t("toYourAccount"), t("toUnleashYourDream")];

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-[50%] xl:w-[40%] h-[90%] xl:h-full 2xl:h-[85%] hidden md:inline-block">
        <img
          className="w-[90%] h-full object-cover rounded-3xl"
          src={loginImg}
          alt=""
        />
        <img
          className="w-[90%] absolute top-6 right-8 -z-10 blur-2xl h-full object-cover rounded-3xl"
          src={loginImg}
          alt=""
        />
      </div>
      <div
        className="p-4 flex flex-col justify-center items-center gap-10 lg:gap-20 3xl:gap-32 w-full md:w-[50%] xl:w-[40%]"
      >
        <div className="self-start space-y-2">
          <span className="text-3xl text-white font-poppinsRegular block">
            {t("login")}
          </span>
          <FlipWords
            className="text-white/50 text-xl px-0 dark:text-neutral-400 font-poppinsLight"
            words={words}
          />
        </div>
        <HoverBorderGradient
          containerClassName="w-full dark:border-black border-zinc-500 dark:hover:border-lime-700"
          className="dark:bg-zinc-950 bg-lime-950 w-full h-10 lg:h-12 xl:h-16 3xl:h-20 text-black dark:text-zinc-300 flex items-center justify-center space-x-2"
        >
          <Button
            type="button"
            onPress={handleLogin}
            className="w-full bg-transparent h-full text-white text-xl xl:text-lg 3xl:text-3xl"
            isLoading={isPending}
          >
            {t("login")}
          </Button>
        </HoverBorderGradient>
      </div>
    </div>
  );
}

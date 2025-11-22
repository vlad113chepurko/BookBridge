"use client";
import { ui } from "@/components/ui/index";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import type { UserLogin } from "@/types/auth.types";

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UserLogin>();

  const onSubmit = async (data: UserLogin) => {
    console.log(data);
  };

  return (
    <div className="main">
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <h1 className="text-[3rem] font-extrabold  dark:text-white ">
          Login Page
        </h1>
        <section>
          <ui.Label htmlFor="email">Email</ui.Label>
          <ui.Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="Email"
          />
        </section>

        <section>
          <ui.Label htmlFor="password">Password</ui.Label>
          <ui.Input
            {...register("password")}
            id="password"
            type="password"
            placeholder="Password"
          />
        </section>

        <ui.Button disabled={isSubmitting} variant="secondary" type="submit">
          {isSubmitting ? <ui.Spinner /> : "Login"}
        </ui.Button>

        <section>
          <ui.Button
            className="text-amber-50"
            variant="link"
            onClick={() => router.push("/pages/register")}
          >
            Create an account
          </ui.Button>
        </section>
      </form>
    </div>
  );
}

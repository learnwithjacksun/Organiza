import toast from "react-hot-toast";
import AuthLayout from "../../../Layouts/AuthLayout";
import PageTransition from "../../../Layouts/PageTransitions";
import { useEffect, useState } from "react";
import Input from "../../UI/Input";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/organizations");
    }
  }, [user, navigate]);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email) toast.error("E-mail is required!");
    else if (!form.password) toast.error("Password is required!");
    else if (form.password < 8)
      toast.error("Password must be at least 8 characters!");
    else {
      toast.promise(login(form.email, form.password), {
        loading: "Logging In...",
        success: "Login Successfull!",
        error: (err) => {
          return `${err}`;
        },
      });
    }
  };

  return (
    <>
      <PageTransition>
        <AuthLayout
          title="Welcome back! 🎉"
          subtitle="Sign into your account to continue."
        >
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-[480px] mx-auto flex flex-col gap-4 bg-light py-6 rounded-md"
          >
            <Input
              id="email"
              label="E-mail"
              type="email"
              placeholder="Enter your e-mail address"
              bg_color="bg-secondary"
              value={form.email}
              handleChange={handleChange}
            />

            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="> 7 characters"
              bg_color="bg-secondary"
              value={form.password}
              handleChange={handleChange}
            />
            <Link className="underline text-sm text-sub font-medium">
              forgotten password?
            </Link>
            <button type="submit" className="btn-primary h-10 rounded-lg">
              Login
            </button>
            <p className="text-center text-sm text-sub">
              Create new account?{" "}
              <Link to="/register" className="font-bold underline text-primary">
                Register
              </Link>
            </p>
          </form>
        </AuthLayout>
      </PageTransition>
    </>
  );
};

export default Login;

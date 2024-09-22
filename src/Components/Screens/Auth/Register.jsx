import toast from "react-hot-toast";
import AuthLayout from "../../../Layouts/AuthLayout";
import PageTransition from "../../../Layouts/PageTransitions";
import { useState } from "react";
import Input from "../../UI/Input";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const Register = () => {
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name) toast.error("Username is required!");
    else if (!form.email) toast.error("E-mail is required!");
    else if (!form.password) toast.error("Password is required!");
    else if (form.password < 8)
      toast.error("Password must be at least 8 characters!");
    else {
      toast.promise(register(form.email, form.password, form.name), {
        loading: "Creating account...",
        success: "Account created!",
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
          title="Create New Account"
          subtitle="To get started, sign up on Organiza!"
        >
          <form
            onSubmit={handleSubmit}
            className="w-full md:w-[480px] mx-auto flex flex-col gap-4 bg-light py-6 rounded-md"
          >
            <Input
              id="name"
              label="Username"
              type="text"
              placeholder="Enter your name"
              bg_color="bg-secondary"
              value={form.name}
              handleChange={handleChange}
            />

            <Input
              id="email"
              label="E-mail"
              type="text"
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
            <button type="submit" className="btn-primary h-10 rounded-lg">
              Register
            </button>
            <p className="text-center text-sm text-sub">
              Already have an account?{" "}
              <Link to="/login" className="font-bold underline text-primary">
                Login
              </Link>
            </p>
          </form>
        </AuthLayout>
      </PageTransition>
    </>
  );
};

export default Register;

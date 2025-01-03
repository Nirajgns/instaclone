import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import axios from "axios";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        input,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        navigate("/login");
        setInput({
          username: "",
          email: "",
          password: "",
        });

        toast.success(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center w-screen h-screen justify-center">
      <form
        onSubmit={handleSignup}
        className="shadow-lg flex flex-col gap-5 p-8 "
      >
        <div className="my-4">
          <h1 className="text-center font-bold text-xl">LOGO</h1>

          <p className="text-center text-sm">
            Sign up and connect with the world...
          </p>
        </div>

        <div>
          <Label>Username</Label>
          <Input
            value={input.username}
            type="text"
            name="username"
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent"
          />
        </div>

        <div>
          <Label>Email</Label>
          <Input
            value={input.email}
            type="email"
            name="email"
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent"
          />
        </div>

        <div>
          <Label>Password</Label>
          <Input
            value={input.password}
            type="Password"
            name="password"
            onChange={changeEventHandler}
            className="focus-visible:ring-transparent"
          />
        </div>

        {loading ? (
          <Button>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Please wait...
          </Button>
        ) : (
          <Button type="submit">Sign Up</Button>
        )}

        <span className="text-center">
          Already have an account?{" "}
          <Link className="text-blue-600" to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;

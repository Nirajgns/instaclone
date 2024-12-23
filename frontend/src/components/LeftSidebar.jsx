import {
  Heart,
  Home,
  LogOut,
  MessageCircle,
  PlusSquare,
  Search,
  TrendingUp,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import { useState } from "react";
import CreatePostDialog from "./CreatePostDialog";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth); //destructures user from store.auth.user

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/user/logout", {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setAuthUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const sidebarHandler = (text) => {
    if (text === "Logout") {
      logoutHandler();
    }

    if (text === "Create") {
      setOpen(true);
    }
  };

  const sidebarItems = [
    { icon: <Home />, text: "Home" },
    { icon: <Search />, text: "Search" },

    { icon: <TrendingUp />, text: "Explore" },

    { icon: <MessageCircle />, text: "Messages" },

    { icon: <Heart />, text: "Notifications" },

    { icon: <PlusSquare />, text: "Create" },

    {
      icon: (
        <Avatar className="h-6 w-6">
          <AvatarImage src={user?.profilePicture} alt="NG" />
          <AvatarFallback>NG</AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },

    { icon: <LogOut />, text: "Logout" },
  ];

  return (
    <div className="fixed top-0 z-10 h-screen w-[16%] border-r border-gray-300 px-4">
      <div className="flex flex-col">
        <h1 className="text-center text-xl">LOGO</h1>
        <div className="">
          {sidebarItems.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => sidebarHandler(item.text)}
                className="relative my-3 flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-gray-100"
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
      <CreatePostDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default LeftSidebar;

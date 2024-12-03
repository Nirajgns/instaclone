import { Outlet } from "react-router-dom";
import Feed from "./Feed";
import RightSideBar from "./RightSideBar";
import useGetAllPost from "@/hooks/getAllpost";

const Home = () => {
  const a = "hello";
  console.log("a:", a);

  useGetAllPost();
  return (
    <div className="flex">
      <div className="flex-grow">
        <Feed />
        <Outlet />
      </div>
      <RightSideBar />
    </div>
  );
};

export default Home;

import { MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

const Post = () => {
  return (
    <div className="my-8 w-full max-w-sm mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt="post_image" />
            <AvatarFallback>NG</AvatarFallback>
          </Avatar>
          <h1>username</h1>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>

          <DialogContent className="flex flex-col items-center text-sm text-center">
            <Button variant="ghost" className="cursor-pointer w-fit  font-bold">
              Add to favourites
            </Button>

            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Unfollow
            </Button>
            <Button
              variant="ghost"
              className="cursor-pointer w-fit text-[#ED4956] font-bold"
            >
              Delete
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Post;

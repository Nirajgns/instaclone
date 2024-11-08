import { Bookmark, MessageCircle, MoreHorizontal, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import CommentDialog from "./CommentDialog";
import { useState } from "react";

const Post = () => {
  const [comment, setComment] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);

  const changeEventHandler = (e) => {
    const commentText = e.target.value;
    if (commentText.trim()) {
      setComment(commentText);
    } else {
      setComment("");
    }
  };

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
      <img
        className="rounded-sm my-2 w-full aspect-square object-cover"
        src="https://images.unsplash.com/photo-1719937050445-098888c0625e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMXx8fGVufDB8fHx8fA%3D%3D"
        alt="post_image"
      />
      <div className="flex justify-between">
        <div className="flex gap-3 justify-center">
          <FaRegHeart
            size={"22px"}
            className="cursor-pointer hover:text-gray-600"
          />
          <MessageCircle
            onClick={() => setDialogOpen(true)}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark className="cursor-pointer hover:text-gray-600" />
      </div>
      <span className="font-medium block mb-2">1K likes</span>
      <p>
        <span className="font-medium mr-2">username</span>
        caption Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae
        reprehenderit excepturi eveniet sunt aliquam soluta quis deserunt!
        Deleniti, adipisci sunt ab quo, similique repellat doloribus
        repellendus, dolorum earum natus veritatis.
      </p>
      <span
        onClick={() => setDialogOpen(true)}
        className="cursor-pointer text-sm text-gray-400"
      >
        View all 10 comments
      </span>
      <CommentDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      <div className="flex items-center justify-between">
        <input
          type="text"
          name="comment"
          value={comment}
          onChange={changeEventHandler}
          id=""
          placeholder="Add a comment..."
          className="outline-none text-sm w-full"
        />

        {comment && <span className="text-[#3BADF8]">Post</span>}
      </div>
    </div>
  );
};

export default Post;

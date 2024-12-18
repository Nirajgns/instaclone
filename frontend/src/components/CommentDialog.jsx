import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

const CommentDialog = ({ open, setOpen }) => {
  const [text, setText] = useState("");
  const { selectedPost } = useSelector((state) => state.post);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;

    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const postCommentHandler = async () => {
    alert(text);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-5xl p-0 flex flex-col">
        <div className="flex flex-1">
          <div className="w-1/2">
            <img
              src={selectedPost?.image}
              className="w-full h-full object-cover rounded-l-lg"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between">
            <div className="flex items-center justify-between p-4">
              <div className="flex gap-3 items-center">
                <Link>
                  <Avatar>
                    <AvatarImage src={selectedPost?.author?.profilePicture} />
                    <AvatarFallback>NG</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <Link className="p-2 font-bold text-xs">
                    {selectedPost?.author?.username}
                  </Link>
                  {/* <span className="text-gray-600 text-sm">Bio here...</span> */}
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <MoreHorizontal className="cursor-pointer" />
                </DialogTrigger>
                <DialogContent className="flex flex-col items-center text-center">
                  {" "}
                  <div className="cursor-pointer w-full text-[#ED4956]">
                    Unfollow
                  </div>
                  <div>Add to favourite</div>
                </DialogContent>
              </Dialog>
            </div>

            <hr />

            <div className="overflow-y-auto flex-1 max-h-96 p-4">
              {selectedPost.comments.map((comment) => {
                <Comment comment={comment} key={comment._id} />;
              })}
              Comments here
            </div>

            <div className="p-4">
              <div className="flex items-center gap-2">
                <input
                  className="w-full outline-none border border-gray-300 p-2 rounded"
                  type="text"
                  name="comment"
                  placeholder="Add a comment..."
                  onChange={changeEventHandler}
                  value={text}
                />
                <Button
                  disabled={!text.trim()}
                  onClick={() => {
                    postCommentHandler;
                  }}
                  variant="ghost"
                  className="text-blue-600"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CommentDialog;

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { readFileAsDataURL } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "@/redux/postSlice";

const CreatePostDialog = ({ open, setOpen }) => {
  const imageRef = useRef();
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const fileChangeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      const dataUrl = await readFileAsDataURL(file);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("caption", caption);
    if (imagePreview) {
      formData.append("image", file);
    }

    try {
      setIsUploading(true);
      console.log(file, caption);
      const res = await axios.post(
        "http://localhost:5000/api/v1/post/addpost",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        },
      );
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={() => setOpen(false)}>
        <DialogHeader className={"text-center font-semibold"}>
          Create new post
        </DialogHeader>
        <div className="flex gap-3 items-center">
          <Avatar>
            <AvatarImage src={user?.profilePicture} alt="" />

            <AvatarFallback>NG</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-xs">{user?.username}</h1>
            <span className="text-gray-600 text-xs">Bio here...</span>
          </div>
        </div>
        <Textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="focus-visible:ring-transparent border-none"
          placeholder="What's on your mind?"
        />
        {imagePreview && (
          <div className="w-full h-64 flex justify-center items-center">
            <img
              src={imagePreview}
              alt="preview"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}

        <input
          ref={imageRef}
          onChange={fileChangeHandler}
          type="file"
          className="hidden"
          name=""
          id=""
        />
        <Button
          onClick={() => imageRef.current.click()}
          className="w-fit mx-auto bg-[#0095f6] hover:bg-[#358bcf"
        >
          Select photo from computer...
        </Button>
        {imagePreview &&
          (isUploading ? (
            <Button>
              <Loader2 className="animate-spin -mr-2 h-4 w-4" />
              Please wait...
            </Button>
          ) : (
            <Button onClick={createPostHandler}>Post</Button>
          ))}
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;

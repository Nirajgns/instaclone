import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Comment = ({ comment }) => {
  return (
    <div className="my-2">
      {console.log("comment:", comment)}
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={comment?.author?.profilePicture} />
          <AvatarFallback>{comment?.author?.name?.[0]}</AvatarFallback>
        </Avatar>
        <h1 className="font-bold text-sm">
          {comment?.author?.name}
          <span className="font-normal pl-1">{comment?.text}</span>
        </h1>
      </div>
    </div>
  );
};

export default Comment;

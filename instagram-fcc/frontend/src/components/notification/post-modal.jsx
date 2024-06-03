import Post from "../Post";

function PostModal({ handleClick, content }) {
  return (
    <div
      style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      className={`${
        Object.keys(content).length > 0 ? "1" : "hidden"
      } fixed inset-0 flex items-center justify-center  z-50`}
    >
      <div className="relative bg-white rounded-lg p-8 w-11/12 md:max-w-md mx-auto">
        <div className="h-96 overflow-y-auto">
          <div
            className="text-4xl absolute w-10 h-10 top-0 right-0 rounded-full bg-indigo-500 text-white cursor-pointer"
            onClick={handleClick}
          >
            &#215;
          </div>
          <Post content={content}></Post>
        </div>
      </div>
    </div>
  );
}

export default PostModal;

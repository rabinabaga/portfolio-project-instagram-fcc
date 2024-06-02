import Post from "../Post";

function PostModal({ handleClick, content }) {
  return (
    <div
      className={`${
        Object.keys(content).length > 0 ? "block" : "hidden"
      } fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50`}
    >
      <div className="bg-white rounded-lg p-8 w-11/12 md:max-w-md mx-auto">
        <div className="h-96 overflow-y-auto">
          <Post content={content}></Post>
        </div>
      </div>
    </div>
  );
}

export default PostModal;

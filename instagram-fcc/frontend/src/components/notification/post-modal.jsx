import Post from "../Post";

function PostModal({ handleClick, content }) {
  return (
    <>
      <div
        id="authentication-modal"
        tabindex="-1"
        aria-hidden="true"
        className={`${
          Object.keys(content).length > 0 ? "block" : "hidden"
        } border border-2 border-black `}
      >
        <div className="fixed top-20 left-60 p-4 w-full max-w-md max-h-full">
          <div className="fixed border border-2 border-stone-950 bg-indigo-500 rounded-lg shadow dark:bg-gray-700">
            <Post content={content}/>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostModal;

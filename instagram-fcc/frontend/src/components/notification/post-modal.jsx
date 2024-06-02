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
        <div className="relative w-full border border-black border-8 border-slate-500">
          <div className=" fixed left-96 w-96 h-48 overflow-y  mx-auto p-4 shadow-cyan-500/50 rounded-lg shadow dark:bg-gray-700">
            <div
              className="text-4xl absolute w-10 h-10 top-0 right-0 rounded-full bg-indigo-500 text-white cursor-pointer"
              onClick={handleClick}
            >
              &#215;
            </div>

            <Post content={content} />
          </div>
        </div>
      </div>
    </>
  );
}

export default PostModal;

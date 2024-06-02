function Header({ pic, username }) {
 if(username){
    return (
      <div className="max-w-screen-md mx-auto grid grid-cols-6 pt-7">
        <div className="col-span-2 px-6 py-4">
          <img
            src={`/imges/avatars/${username}.jpg`}
            alt="user profile picture"
            className="rounded-full"
          />
        </div>
        <div className="col-span-4">
          <div className="grid grid-cols-4">
            <p className="col-span-1 font-semibold">{username}</p>
            <button className="bg-slate-200 border border-black font-bold mx-3">
              Edit profile
            </button>
            <button className="bg-slate-200 border border-slate-800 border-2 font-bold">
              View archive
            </button>
          </div>
        </div>
      </div>
    );
 }
}

export default Header;

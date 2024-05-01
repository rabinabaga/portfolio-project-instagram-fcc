import usePhotos from "../hooks/use-photos";
import Skeleton from 'react-loading-skeleton'
import Post from "./Post";

export default function Timeline() {
  //  we need to get the logged in user's following's photos ( hook)

  const { photos } = usePhotos();

  // on loading the photos, we need to use react skeleton

  //if we have photos, render them (create a post component)
  //if the user has no photos, tell them to follow people

  return (
 
    //TODO1: when photos not loaded, show the skeleton instead of follow to see photos text
    <div className="container col-span-2">
      {!photos ? (
        <Skeleton count={1} width={320} height={400} />
      ) : photos?.length > 0 ? (
        photos.map((content) => {
          return <Post key={content._id} content={content}></Post>;
        })
      ) : (
        <p className="text-center text-2xl">Follow people to see photos</p>
      )}
    </div>
  );
}


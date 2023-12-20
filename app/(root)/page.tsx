import { fetchPosts } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import ThreadCard from "@/components/cards/ThreadCard";
import Loader from "@/components/shared/Loader";

const Home = async() => {

  const user = await currentUser();
  let isLoading = true;
  let result: any = null;

  if(!user) return null;

  try {
    result = await fetchPosts(1, 30);
      isLoading = false;
  } catch(error: any){
      isLoading = false;
      throw new Error(`Error: ${error.message}`)
  }
  
  return (
    <>
    {isLoading ? <Loader /> : (
      <>      
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {result.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <>
            {result.posts.map((post: any) => (
              <ThreadCard 
                key={post._id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
              />
            ))}
          </>
        )}
      </section>
      </>
    )}
    </>
  )
}

export default Home;

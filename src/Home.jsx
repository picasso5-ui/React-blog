import { useEffect } from "react";
import BlogList from "./BlogList";

const Home = ({
  error,
  setError,
  blogs,
  setBlogs,
  isLoading,
  setIsLoading,
}) => {
  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("could not fetch the data");
        }
        return res.json();
      })
      .then((data) => {
        setBlogs(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });
  }, []);

  return (
    <div className="Home">
      <h2>All Blogs!</h2>
      {error && <p>{error}</p>}
      {isLoading && <p>loading your data...</p>}

      <BlogList blogs={blogs} setBlogs={setBlogs}/>
    </div>
  );
};

export default Home;

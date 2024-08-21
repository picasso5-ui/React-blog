import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [singleBlog, setSingleBlog] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Couldnt get a detailed page");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setSingleBlog(data);
        setError(false);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  }, [id]);

  return (
    <div>
      {error && <p>{error}</p>}
      {isLoading && <p>loading details...</p>}
      {singleBlog && (
        <article className="details">
          <h2 className="details">{singleBlog.title}</h2>
          <p>{singleBlog.body}</p>
        </article>
      )}
    </div>
  );
};

export default BlogDetails;

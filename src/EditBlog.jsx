import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setBody(data.body);
    console.log(data.title);
        
      })
      .catch((err) => setError("failed to load post data", err));
  }, [id]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedPost = { title, body };

    fetch(`http://localhost:3000/posts/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedPost),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Filed to update blog");
        }
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setError(null);
        navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.message);
      });
  };

  return (
    <div className="EditBlogs-parents">
      {error && <p>{error}</p>}

      <p>Edit Blog</p>
      <form onSubmit={handleEditSubmit}>
        <input
          type="text"
          className="Edit-input"
          placeholder="Edit Your blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          type="text"
          className="textArea"
          placeholder="Edit Your blog here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <div>
          <button disabled={isLoading}>
            {isLoading ? "updating blog..." : "update Blog"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;

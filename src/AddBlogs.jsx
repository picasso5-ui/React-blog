import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBlogs = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newBlog = { title, body };

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newBlog),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not publish your blog");
        }
        return res.json();
      })
      .then((data) => {
        console.log(newBlog);
        
        setIsLoading(false);
        setError(null);
        setTitle("");
        setBody("");
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(err.message);
      });
  };

  return (
    <div className="AddBlogs-parents">
      {error && <p>{error}</p>}

      <p>Add Blog</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="Add-input"
          placeholder="Enter Your blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          type="text"
          className="textArea"
          placeholder="Enter Your blog here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <div>
            <button disabled={isLoading}>
                {isLoading? "Adding blog..." : "Add Blog"}
            </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogs;

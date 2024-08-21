import { Link } from "react-router-dom";

const BlogList = ({ blogs, setBlogs }) => {
  const handleDelete = async (id) => {
    const confirmed = window.confirm("want to delete?");
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("failed to delete");
      }
      
      
setBlogs(prevBlog=>prevBlog.filter(blog=>blog.id !== id))


    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div className="blog-list">
      {blogs?.map((blog) => (
        <div key={blog?.id}>
          <div className="blog-preview" key={blog.id}>
            <Link to={`blogDetails/${blog.id}`}>
              <h2>{blog?.title}</h2>
              <p>
                <i>written by {blog?.body}</i>
              </p>
            </Link>
            <div>
              <button onClick={() => handleDelete(blog.id)}>delete</button>
              <Link to={`/editBlog/${blog.id}`}>
                <button>Edit blog</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;

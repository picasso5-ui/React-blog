import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to={"/"}>
        <h1>
          Joel <span style={{ color: "rgb(98, 0, 255)" }}>Blog</span>
        </h1>
      </Link>
      <div className="links">
        <Link to={"/"}>Home</Link>
        <Link to={"/AddBlogs"}>Create Blog</Link>
      </div>
    </nav>
  );
};

export default Navbar;

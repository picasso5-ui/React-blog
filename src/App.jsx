import React, { useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import { Route, Routes } from "react-router-dom";
import AddBlogs from "./AddBlogs";
import BlogDetails from "./BlogDetails";
import NotFound from "./NotFound";
import EditBlog from "./EditBlog";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <>
      <div className="App">
        <Navbar />
        <div>
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  blogs={blogs}
                  setBlogs={setBlogs}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  error={error}
                  setError={setError}
                />
              }
            />

            <Route path="/AddBlogs" element={<AddBlogs />} />

             <Route path="/editBlog/:id" element={<EditBlog />} />
            <Route path="/blogDetails/:id" element={<BlogDetails />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

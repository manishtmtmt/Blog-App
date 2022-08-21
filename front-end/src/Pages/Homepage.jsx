import { Box, Container } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BlogCard from "../Components/BlogCard";
import Navbar from "../Components/Navbar";
import NewBlog from "../Components/NewBlog";
import { getBlogs } from "../Store/App/action";

const Homepage = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state.appReducer);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Container>
        <NewBlog />
        <Box>
          {blogs.map((blog) => (
            <BlogCard {...blog} key={blog._id} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default Homepage;

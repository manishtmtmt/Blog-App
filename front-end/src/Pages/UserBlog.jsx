import { Box, Container } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BlogCard from "../Components/BlogCard";
import Navbar from "../Components/Navbar";
import { getUserBlogs } from "../Store/App/action";

const UserBlog = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();

  const { userBlogs } = useSelector((state) => state.appReducer);

  useEffect(() => {
    dispatch(getUserBlogs(userId));
  }, [dispatch, userId]);

  return (
    <>
      <Navbar />
      <Container>
        <Box>
          {userBlogs.map((blog) => (
            <BlogCard {...blog} key={blog._id} />
          ))}
        </Box>
      </Container>
    </>
  );
};

export default UserBlog;

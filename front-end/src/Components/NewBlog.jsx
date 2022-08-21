import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBlog } from "../Store/App/action";
import {
  CREATE_BLOG_FAILURE,
  CREATE_BLOG_SUCCESS,
} from "../Store/App/actionTypes";
import { getData } from "../Utils/localStorage";

const NewBlog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [blog, setBlog] = useState({});
  const btnRef = useRef(null);
  const { isAuth } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.appReducer);

  const alerMessage = () => {
    alert("you've to login to access this feature.");
    navigate("/login");
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setBlog({
        ...blog,
        [name]: files[0],
      });
    } else {
      setBlog({
        ...blog,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    const userId = getData("userId");
    e.preventDefault();
    await dispatch(createBlog(userId, blog)).then((r) => {
      if (r.status === CREATE_BLOG_SUCCESS) {
        alert(r.payload);
        window.location.reload();
      } else if (r.status === CREATE_BLOG_FAILURE) {
        alert(r.payload);
      }
    });
    onClose();
  };

  return (
    <>
      {isAuth === false ? (
        <Button
          fontSize={{ base: "lg", md: "lg", lg: "xl", xl: "xl" }}
          mt={5}
          colorScheme="blue"
          ref={btnRef}
          onClick={alerMessage}
        >
          Create new blog
        </Button>
      ) : (
        <>
          <Button
            fontSize={{ base: "lg", md: "lg", lg: "xl", xl: "xl" }}
            mt={5}
            colorScheme="blue"
            ref={btnRef}
            onClick={onOpen}
          >
            Create new blog
          </Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create a new blog</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing={4}>
                  <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                      <FormControl id="title" isRequired>
                        <FormLabel>Title</FormLabel>
                        <Input
                          type="text"
                          name="title"
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl id="blog_img" isRequired>
                        <FormLabel>Image</FormLabel>
                        <Input
                          type="file"
                          name="blog_img"
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl id="topic" isRequired>
                        <FormLabel>Topic</FormLabel>
                        <Select
                          placeholder="Select topic"
                          name="category"
                          onChange={handleChange}
                        >
                          <option value="Nature">Nature</option>
                          <option value="Education">Education</option>
                          <option value="Technology">Technology</option>
                          <option value="Sports">Sports</option>
                        </Select>
                      </FormControl>
                      <FormControl id="description" isRequired>
                        <FormLabel>Content</FormLabel>
                        <Textarea
                          placeholder="Write your blog here"
                          name="description"
                          onChange={handleChange}
                        />
                      </FormControl>
                      <HStack justifyContent="flex-end" py={2}>
                        <Button
                          p={{
                            base: "1rem 1rem",
                            lg: "1rem 2rem",
                            xl: "1rem 2rem",
                          }}
                          isLoading={isLoading}
                          type="submit"
                          colorScheme="blue"
                          mr={3}
                        >
                          Submit
                        </Button>
                        <Button
                          p={{
                            base: "1rem 1rem",
                            lg: "1rem 2rem",
                            xl: "1rem 2rem",
                          }}
                          colorScheme="red"
                          onClick={onClose}
                        >
                          Cancel
                        </Button>
                      </HStack>
                    </Stack>
                  </form>
                </Stack>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default NewBlog;

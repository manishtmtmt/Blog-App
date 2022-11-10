/* eslint-disable react-hooks/exhaustive-deps */
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  WrapItem,
  Link,
  Container,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { deleteBlog, getBlog, updateBlog } from "../Store/App/action";
import {
  DELETE_BLOG_FAILURE,
  DELETE_BLOG_SUCCESS,
  UPDATE_BLOG_FAILURE,
  UPDATE_BLOG_SUCCESS,
} from "../Store/App/actionTypes";
import { getData } from "../Utils/localStorage";

const BlogTags = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      <Tag size={"lg"} variant="solid" colorScheme="orange">
        {props.tags}
      </Tag>
    </HStack>
  );
};

export const BlogAuthor = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src={props.avatar}
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date}</Text>
    </HStack>
  );
};

const Blog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const { blogId } = useParams();
  const userId = getData("userId");

  const { blog } = useSelector((state) => state.appReducer);
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState({
    title: blog.title,
    category: blog.category,
    description: blog.description,
  });

  const { isLoading } = useSelector((state) => state.appReducer);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setBlogData({
        ...blogData,
        [name]: files[0],
      });
    } else {
      setBlogData({
        ...blogData,
        [name]: value,
      });
    }
  };

  const handleUpdate = async () => {
    await dispatch(updateBlog(blogId, blogData)).then((res) => {
      if (res.status === UPDATE_BLOG_SUCCESS) {
        alert(res.message);
        window.location.reload();
      } else if (res.status === UPDATE_BLOG_FAILURE) {
        alert(res.message);
      }
    });
    onClose();
  };

  const hanldeBlogDelete = (params) => {
    dispatch(deleteBlog(params)).then((res) => {
      if (res.status === DELETE_BLOG_SUCCESS) {
        alert(res.message);
        navigate("/");
      } else if (res.status === DELETE_BLOG_FAILURE) {
        alert(res.message);
      }
    });
  };

  useEffect(() => {
    dispatch(getBlog(blogId));
  }, [blogId]);

  return (
    <>
      <Navbar />
      <Container spacing="30px" marginTop="5">
        <WrapItem w={"100%"}>
          <Box w="100%">
            <Heading
              as={"h4"}
              fontSize="2xl"
              marginTop="2"
              textAlign={"center"}
            >
              <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                {blog.title}
              </Link>
            </Heading>

            <Box borderRadius="lg" w={"100%"} overflow={"hidden"} my="5">
              <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                <Image
                  transform="scale(1.0)"
                  src={blog.image_url}
                  alt="some text"
                  objectFit="fill"
                  width="100%"
                  height={"100%"}
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                />
              </Link>
            </Box>
            <Flex justify="space-between" align="center">
              <BlogTags tags={blog.category} marginTop="3" />
              {userId === blog.userId ? (
                <Menu>
                  <MenuButton
                    as={IconButton}
                    aria-label="Options"
                    icon={<i className="fa-solid fa-ellipsis-vertical"></i>}
                    variant="outline"
                  />
                  <MenuList size="lg">
                    <MenuItem icon={<EditIcon />} onClick={onOpen}>
                      Edit
                    </MenuItem>
                    <Modal isOpen={isOpen} onClose={onClose}>
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Update blog</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Stack spacing={4}>
                            <form onSubmit={handleUpdate}>
                              <Stack spacing={2}>
                                <FormControl id="title" isRequired>
                                  <FormLabel>Title</FormLabel>
                                  <Input
                                    type="text"
                                    name="title"
                                    value={blogData.title}
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
                                    value={blogData.category}
                                  >
                                    <option value="Nature">Nature</option>
                                    <option value="Education">Education</option>
                                    <option value="Technology">
                                      Technology
                                    </option>
                                    <option value="Sports">Sports</option>
                                  </Select>
                                </FormControl>
                                <FormControl id="description" isRequired>
                                  <FormLabel>Content</FormLabel>
                                  <Textarea
                                    placeholder="Write your blog here"
                                    name="description"
                                    value={blogData.description}
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
                    <MenuItem
                      icon={<DeleteIcon />}
                      onClick={() => hanldeBlogDelete(blog._id)}
                    >
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : null}
            </Flex>
            <Text as="p" fontSize="md" marginTop="2" textAlign={"justify"}>
              {blog.description}
            </Text>
            <BlogAuthor
              name={blog.author}
              date={blog.date}
              avatar={blog.author_profile_pic}
            />
          </Box>
        </WrapItem>
      </Container>
    </>
  );
};

export default Blog;

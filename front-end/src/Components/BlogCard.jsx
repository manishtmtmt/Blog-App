import {
  Box,
  Heading,
  HStack,
  Image,
  Tag,
  Text,
  Wrap,
  WrapItem,
  Link,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const BlogTags = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      <Tag size={"md"} variant="solid" colorScheme="orange">
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

const BlogCard = ({
  _id,
  title,
  image_url,
  description,
  category,
  date,
  author,
  author_profile_pic,
}) => {
  const navigate = useNavigate();

  const handleClick = (params) => {
    navigate(`/blog/${params}`);
  };

  const toShow = description.substring(0, 100) + "...";

  return (
    <Wrap spacing="30px" marginTop="40px" px="2">
      <WrapItem w={"100%"}>
        <Box w="100%">
          <Box borderRadius="lg" w={"100%"} height="300px" overflow={"hidden"}>
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              <Image
                transform="scale(1.0)"
                src={image_url}
                alt="some text"
                objectFit="fill"
                width="100%"
                height={"100%"}
                transition="0.3s ease-in-out"
                _hover={{
                  transform: "scale(1.05)",
                }}
                onClick={() => handleClick(_id)}
              />
            </Link>
          </Box>
          <BlogTags tags={category} marginTop="3" />
          <Heading fontSize="xl" marginTop="2">
            <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
              {title}
            </Link>
          </Heading>
          <Text as="p" fontSize="md" marginTop="2">
            {toShow}
            <span onClick={() => handleClick(_id)}>
              <Link>Read More</Link>
            </span>
          </Text>
          <BlogAuthor name={author} date={date} avatar={author_profile_pic} />
        </Box>
      </WrapItem>
    </Wrap>
  );
};

export default BlogCard;

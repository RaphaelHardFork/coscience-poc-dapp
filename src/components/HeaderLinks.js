import {
  Box,
  Button,
  Flex,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"

const HeaderLinks = ({ user, isOpen, onClose }) => {
  const hover = useColorModeValue("grayBlue.100", "grayOrange.600")
  const pill = useColorModeValue("main", "second")
  return (
    <Flex
      key={user.id}
      alignItems="center"
      flexDirection={isOpen ? "column" : ""}
      w={isOpen ? "full" : ""}
    >
      <Button
        w={isOpen ? "full" : ""}
        onClick={onClose}
        as={Link}
        to="/"
        variant="ghost"
      >
        Home
      </Button>
      <Button
        disabled={user.id === undefined}
        as={Link}
        to={`/profile/${user.id}`}
        variant="ghost"
        onClick={onClose}
        w={isOpen ? "full" : ""}
      >
        Profile
      </Button>
      <Button
        w={isOpen ? "full" : ""}
        onClick={onClose}
        as={Link}
        to="/list-of-users"
        variant="ghost"
      >
        List of users
      </Button>
      <Button
        w={isOpen ? "full" : ""}
        onClick={onClose}
        variant="ghost"
        as={Link}
        to="/upload-article"
      >
        Upload Article
      </Button>
      <Button
        w={isOpen ? "full" : ""}
        onClick={onClose}
        variant="ghost"
        as={Link}
        to="/about"
      >
        About
      </Button>
      {user.id === undefined ? (
        "Loading"
      ) : user.id === 0 ? (
        <Button
          onClick={onClose}
          as={Link}
          to="/sign-up"
          colorScheme="teal"
          size="sm"
        >
          Sign up
        </Button>
      ) : (
        <>
          <LinkBox
            display="flex"
            transition="0.3s"
            borderRadius="10"
            _hover={{ bg: hover }}
            p="2"
            alignItems="center"
          >
            <Box
              me="4"
              bgGradient={`linear(to-br,${pill},grayBlue.500)`}
              width="25px"
              height="25px"
              borderRadius="100"
            ></Box>
            <LinkOverlay as={Link} to={`/profile/${user.id}`} />
            <Text fontWeight="bold">
              {user.firstName} {user.lastName}
            </Text>
          </LinkBox>
        </>
      )}
    </Flex>
  )
}

export default HeaderLinks

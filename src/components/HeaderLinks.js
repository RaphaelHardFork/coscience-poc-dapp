import { Box, Button, useDisclosure } from "@chakra-ui/react"
import React from "react"
import { Link } from "react-router-dom"

const HeaderLinks = ({ user }) => {
  const mobileNav = useDisclosure()
  return (
    <Box
      key={user.id}
      flexDirection={mobileNav.isOpen ? "column" : "row"}
      display={"flex"}
    >
      <Button as={Link} to="/" variant="ghost" w="100">
        Home
      </Button>
      <Button
        disabled={user.id === undefined}
        as={Link}
        to={`/profile/${user.id}`}
        variant="ghost"
        w="100"
      >
        Profile
      </Button>
      <Button as={Link} to="/list-of-users" variant="ghost" w="100">
        List of users
      </Button>
      <Button variant="ghost" as={Link} to="/upload-article" w="100">
        Upload Article
      </Button>
      <Button variant="ghost" as={Link} to="/about" w="100">
        About
      </Button>
      <Button as={Link} to="/sign-up" colorScheme="teal" size="sm" w="100">
        Sign up
      </Button>
    </Box>
  )
}

export default HeaderLinks

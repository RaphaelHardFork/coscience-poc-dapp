import React from "react"
import { Box, List, ListItem, Link } from "@chakra-ui/layout"

const Footer = () => {
  return (
    <Box as="footer">
      <List d="flex" justifyContent="center">
        <ListItem>
          <Link href="/about">What is CoScience?</Link>
        </ListItem>
        <ListItem>
          <Link href="/terms">Terms of Use</Link>
        </ListItem>
        <ListItem>
          <Link href="/privacy">Privacy</Link>
        </ListItem>
      </List>
    </Box>
  )
}

export default Footer

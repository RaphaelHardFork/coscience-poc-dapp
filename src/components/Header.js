import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Box,
  Text,
  Button,
} from "@chakra-ui/react"
import { ChevronRightIcon } from "@chakra-ui/icons"
import { useContext } from "react"
import { Web3Context } from "web3-hooks"

const Header = () => {
  const [web3state, login] = useContext(Web3Context)

  return (
    <>
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          Coscience
        </Text>
      </Box>
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/profile">Profile</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/upload-article">Upload Article</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink href="/about">About</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Button onClick={login}>Sign in</Button>
      <Text>{web3state.networkName}</Text>
      <Text>{web3state.account}</Text>
    </>
  )
}

export default Header

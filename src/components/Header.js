import React, { useState, useEffect } from "react"
import {
  Box,
  Badge,
  Flex,
  useColorModeValue,
  HStack,
  IconButton,
  useDisclosure,
  VStack,
  CloseButton,
  Heading,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Link
} from "@chakra-ui/react"
import { HamburgerIcon, MoonIcon, SunIcon, BellIcon } from "@chakra-ui/icons"

import { useColorMode } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import { useUsersContract } from "../hooks/useUsersContract"
import HeaderLinks from "./HeaderLinks"
import { useGovernanceContract } from "../hooks/useGovernanceContract"
import { useArticlesContract } from "../hooks/useArticlesContract"
import { useReviewsContract } from "../hooks/useReviewsContract"

const Header = () => {
  const { userData, userList } = useUsersContract()
  const { governance } = useGovernanceContract()
  const { articles } = useArticlesContract()
  const { reviews } = useReviewsContract()
  const { users } = useUsersContract()

  const mobileNav = useDisclosure()
  const { isOpen, onOpen, onClose } = useDisclosure()

  // useState
  const [count, setCount] = useState(0)

  //Color mode
  const { colorMode, toggleColorMode } = useColorMode()

  // get notifications
  useEffect(() => {
    const getNotifs = async () => {
      // need to listen events: Voted, not UserVoted, RecoverVoted

      const eventTab = []

      const banItemEvents = await governance.queryFilter("Voted")
      for (const event of banItemEvents) {
        // notif type (pure)
        let notifType
        if (event.args.contractAddress === articles.address) {
          notifType = "Ban an article"
        } else if (event.args.contractAddress === reviews.address) {
          notifType = "Ban a review"
        } else {
          notifType = "Ban a comment"
        }

        // listen progression (pure)
        let nbOfVote = await governance.filters.Voted(
          event.args.contractAddress,
          event.args.itemID.toNumber(),
          null
        )
        nbOfVote = await governance.queryFilter(nbOfVote)

        const obj = {
          notifType,
          who: event.args.userID.toNumber(),
          itemID: event.args.itemID.toNumber(),
          progression: nbOfVote.length,
          blockNumber: event.blockNumber,
          date: 0
        }

        eventTab.push(obj)
      }

      const userEvents = await governance.queryFilter("UserVoted")
      for (const event of userEvents) {
        const notifType =
          event.args.voteType === 0 ? "Accept an user" : "Ban an user"
        let nbOfVote = await governance.filters.UserVoted(
          null,
          event.args.subjectUserID.toNumber(),
          null
        )
        nbOfVote = await governance.queryFilter(nbOfVote)

        const obj = {
          notifType,
          who: event.args.userID.toNumber(),
          itemID: event.args.subjectUserID.toNumber(),
          progression: nbOfVote.length,
          blockNumber: event.blockNumber,
          date: 0
        }
        eventTab.push(obj)
      }

      // sort by blockNumber
      const sortedTab = eventTab.sort((a, b) => a.blockNumber - b.blockNumber)

      const registerEvents = await users.queryFilter("Registered")

      const recoverEvents = await governance.queryFilter("RecoverVoted")
      console.log(recoverEvents)
      console.log(registerEvents)
      console.log(eventTab)
      console.log(sortedTab)
    }
    if (governance && articles) {
      getNotifs()
    }
  }, [governance, articles, users, reviews])

  // Get informations on governance actions
  useEffect(() => {
    setCount(0)
    userList.forEach((el) => {
      if (el.status === "Pending") {
        setCount((c) => c + 1) // update count
      }
    })
  }, [userList])

  //    Color Value
  const bg = useColorModeValue("white", "grayBlue.900")
  const co = useColorModeValue("main", "second")
  const button = useColorModeValue("colorMain", "colorSecond")

  return (
    <>
      <Box
        zIndex="400"
        bg={bg}
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        shadow="md"
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto">
          <Flex>
            <Heading fontWeight="bold" fontFamily="title" as="h1" ml="2">
              <Link _hover={{ textDecoration: "none" }} as={RouterLink} to="/">
                <Text as="span" color={co}>
                  Co
                </Text>
                Science
              </Link>
            </Heading>
          </Flex>

          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack
              spacing={3}
              mr={1}
              color="brand.500"
              display={{ base: "none", lg: "inline-flex" }}
            >
              <HeaderLinks user={userData} />
            </HStack>

            <Box display={{ base: "inline-flex", lg: "none" }} zIndex="sticky">
              <IconButton
                display={{ base: "flex", lg: "none" }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue("gray.800", "inherit")}
                variant="ghost"
                icon={<HamburgerIcon />}
                onClick={mobileNav.onOpen}
              />

              <VStack
                pos="absolute"
                top={0}
                left={0}
                right={0}
                display={mobileNav.isOpen ? "flex" : "none"}
                p={2}
                pb={4}
                m={2}
                bg={bg}
                spacing={3}
                rounded="sm"
                shadow="sm"
              >
                <CloseButton
                  aria-label="Close menu"
                  onClick={mobileNav.onClose}
                />

                <HeaderLinks
                  user={userData}
                  isOpen={mobileNav.isOpen}
                  onClose={mobileNav.onClose}
                />
              </VStack>
            </Box>
            <HStack
              spacing={3}
              display={mobileNav.isOpen ? "none" : "flex"}
              alignItems="center"
            >
              <IconButton
                variant="ghost"
                size="sm"
                onClick={toggleColorMode}
                borderRadius="full"
              >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </IconButton>

              <Box position="relative" display="inline-block">
                <IconButton
                  boxSize={6}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  variant="outline"
                  color={button}
                  aria-label="Bell notification"
                  icon={<BellIcon />}
                  onClick={onOpen}
                  to="/list-of-users"
                  borderRadius="full"
                />
                <Badge
                  position="absolute"
                  top="-1px"
                  right="-1px"
                  px={2}
                  py={1}
                  fontSize="xs"
                  fontWeight="bold"
                  lineHeight="none"
                  color="red.100"
                  transform="translate(50%,-50%)"
                  bg="red.600"
                  rounded="full"
                  colorScheme="purple"
                >
                  {count}
                </Badge>
                {/* DRAWER NOTIFS */}
                <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Governance notifications</DrawerHeader>

                    <DrawerBody></DrawerBody>

                    <DrawerFooter>
                      <Text>FOOTER</Text>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </Box>
            </HStack>
          </HStack>
        </Flex>
      </Box>
    </>
  )
}

export default Header

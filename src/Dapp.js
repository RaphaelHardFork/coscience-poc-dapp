import { Switch, Route } from "react-router-dom"
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Terms from "./components/Terms"
import Privacy from "./components/Privacy"
import ListOfUsers from "./components/ListOfUsers"

import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Profile from "./pages/Profile"
import UploadArticle from "./pages/UploadArticle"
import RecoverAccount from "./components/RecoverAccount"
import Home from "./pages/Home"
import Article from "./components/Article"
import { useContext } from "react"
import { Web3Context } from "web3-hooks"

const Dapp = () => {
  const [web3State, login] = useContext(Web3Context)
  // color Mode
  const bg = useColorModeValue("gray.200", "gray.500")

  // switch network: will goes soon in a hook
  const switchNetwork = async () => {
    try {
      await web3State.provider.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }],
      })
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      {web3State.isLogged && web3State.networkName === "Rinkeby" ? (
        ""
      ) : (
        <>
          <Box
            top="0"
            position="fixed"
            zIndex="400"
            minH="100vh"
            minW="100vw"
            bg="white"
            opacity="0.8"
          ></Box>
          <Flex
            top="0"
            minW="100vw"
            position="fixed"
            zIndex="401"
            height="50%"
            minH="100vh"
            opacity="1"
          >
            <Box
              p="10"
              borderRadius="30"
              m="auto"
              height="50%"
              width="50%"
              bg="gray.300"
              shadow="dark-lg"
              borderWidth="2"
              border="solid"
              borderColor="orange"
            >
              <Heading textAlign="center">Welcome to CoScience!</Heading>
              {!web3State.isLogged ? (
                <>
                  <Text
                    textAlign="center"
                    fontWeight="bold"
                    opacity="1"
                    p="10"
                    m="auto"
                    fontSize="4xl"
                  >
                    Please connect your Metamask
                  </Text>
                  <Button
                    onClick={login}
                    colorScheme="orange"
                    display="flex"
                    mx="auto"
                  >
                    Connect
                  </Button>
                </>
              ) : (
                <>
                  <Text
                    textAlign="center"
                    fontWeight="bold"
                    opacity="1"
                    p="10"
                    m="auto"
                    fontSize="4xl"
                  >
                    Please switch to Rinkeby network
                  </Text>
                  <Button
                    onClick={switchNetwork}
                    colorScheme="yellow"
                    display="flex"
                    mx="auto"
                  >
                    Switch to Rinkeby
                  </Button>
                </>
              )}
            </Box>
          </Flex>
        </>
      )}

      <Flex minH="100vh" direction="column" alignItems="space-around" bg={bg}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/sign-up">
            <SignUp />
          </Route>
          <Route exact path="/recover">
            <RecoverAccount />
          </Route>
          <Route exact path="/upload-article">
            <UploadArticle />
          </Route>
          <Route exact path="/list-of-users">
            <ListOfUsers />
          </Route>
          <Route exact path="/profile/:id">
            <Profile />
          </Route>
          <Route exact path="/article/:id">
            <Article />
          </Route>
          <Route exact path="/terms">
            <Terms />
          </Route>
          <Route exact path="/privacy">
            <Privacy />
          </Route>
        </Switch>
        <Footer />
      </Flex>
    </>
  )
}

export default Dapp

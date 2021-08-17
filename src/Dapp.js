import { Switch, Route, Link } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import SignUp from "./components/SignUp"
import Terms from "./components/Terms"
import Privacy from "./components/Privacy"
import { useContext } from "react"
import { Web3Context } from "web3-hooks"
import ListOfUsers from "./components/ListOfUsers"
import { Box, Spacer } from "@chakra-ui/react"
import About from "./components/About"
import Profile from "./components/Profile"

const Dapp = () => {
  return (
    <>
      <Box minH="100vh" direction="column">
        <Header />
        <Switch>
          <Route exact path="/">
            <ListOfUsers />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/sign-up">
            <SignUp />
          </Route>
          <Route exact path="/upload-article"></Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/terms">
            <Terms />
          </Route>
          <Route exact path="/privacy">
            <Privacy />
          </Route>
        </Switch>
        <Footer />
      </Box>
    </>
  )
}

export default Dapp

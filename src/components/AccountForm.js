import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  useColorModeValue,
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUsersContract } from '../hooks/useUsersContract'

const AccountForm = () => {
  const [users] = useUsersContract() // [contract]

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [laboratory, setLaboratory] = useState('')
  const [password, setPassword] = useState('')

  //color Mode
  const bg = useColorModeValue('white', 'gray.800')

  async function register() {
    //TODO change with custom hook
    const CID = 'Qmfdfjdofkodzndskdosdnwkccccd'
    const hashedPassword = await ethers.utils.id(password)
    try {
      await users.register(hashedPassword, CID)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Box borderRadius='50' bg={bg} py='10'>
        <Heading textAlign='center' mb='2'>
          Create an account to publish an article
        </Heading>
        <Box mx='auto' maxW='50%' display='flex' flexDirection='column'>
          <FormControl mb='4'>
            <FormLabel>First name</FormLabel>
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='Alice'
              value={firstName}
            />
          </FormControl>
          <FormControl mb='4'>
            <FormLabel>Last name</FormLabel>
            <Input
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Bob'
              value={lastName}
            />
          </FormControl>
          <FormControl mb='4'>
            <FormLabel>Laboratory</FormLabel>
            <Input
              onChange={(e) => setLaboratory(e.target.value)}
              placeholder='MIT'
              value={laboratory}
            />
          </FormControl>
          <FormControl mb='4'>
            <FormLabel>Password</FormLabel>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              placeholder='**********'
            />
          </FormControl>
          <FormControl mb='4'>
            <FormLabel>Confirm password</FormLabel>

            <Input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder='**********'
            />
          </FormControl>
          <Button onClick={register} colorScheme='orange'>
            Register
          </Button>
        </Box>
        <Heading mt='6' textAlign='center' mb='2'>
          Or recover your profile with your password
        </Heading>
        <Box mx='auto' maxW='50%' display='flex' flexDirection='column'>
          <Button mt='6' as={Link} to='/recover' colorScheme='messenger'>
            Recover account
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default AccountForm

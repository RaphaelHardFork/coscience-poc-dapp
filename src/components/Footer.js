import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  HStack
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
  //color Mode
  const bg = useColorModeValue('white', 'grayBlue.900')
  return (
    <>
      <Box
        zIndex='500'
        sx={{
          boxShadow: `0px -1px 7px ${bg === 'white' ? '#DDDDDD' : '#444444'}`
        }}
        bg={bg}
        mt='auto'
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Stack direction='row' spacing={6}>
            <Link as={RouterLink} to='/about'>
              What is Coscience?
            </Link>
            <Link as={RouterLink} to='/about'>
              Terms of use
            </Link>
            <Link as={RouterLink} to='/about'>
              Privacy
            </Link>
            <HStack>
              <FaGithub alt='github icon' />
              <Link
                isExternal
                href='https://github.com/RaphaelHardFork/coscience-poc-dapp/tree/version-0.1'
                variant='link'
                color='main'
                fontWeight='bold'
                my='4'
              >
                Github
              </Link>
            </HStack>
          </Stack>
          <Text>© 2020 Chakra Templates. All rights reserved</Text>
        </Container>
      </Box>
    </>
  )
}

export default Footer

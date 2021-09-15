import React, { useState } from 'react'
import {
  Container,
  Heading,
  Button,
  Text,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberDecrementStepper,
  Slider,
  Flex,
  Box,
  Icon,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useColorModeValue,
  HStack,
  SlideFade
} from '@chakra-ui/react'
import { ethers } from 'ethers'
import { FaEthereum } from 'react-icons/fa'
import { useWeb3 } from '../web3hook/useWeb3'

const About = () => {
  const { state } = useWeb3()
  const { providerType, providerSrc, account, networkName } = state
  const scheme = useColorModeValue('colorMain', 'colorSecond')
  const bg = useColorModeValue('white', 'grayBlue.900')

  const [amount, setAmount] = useState(0)
  const handleChange = (value) => setAmount(value)
  const [status, setStatus] = useState()

  // function sign() {}
  // try to sign a message

  async function donate() {
    try {
      setStatus('Pending')
      const response = await state.signer.sendTransaction({
        from: state.account,
        to: '0x5F6922217C1CFCC7ebC457585c76841b73b179A3',
        value: ethers.utils.parseEther(amount.toString()) // 2441406250
      })
      await response.wait()
      setStatus('Success')
    } catch (e) {
      console.log(e.code)
      if (e.code === 'INSUFFICIENT_FUNDS') {
        setStatus('INSUFFICIENT_FUNDS')
      } else {
        setStatus('Failed')
      }
    }
  }

  return (
    <>
      <Container
        m='auto'
        shadow='lg'
        maxW='container.md'
        bg={bg}
        p='10'
        borderRadius='20'
      >
        <SlideFade
          threshold='0.1'
          delay={{ enter: 0.1 }}
          transition={{
            enter: { duration: 0.7 }
          }}
          offsetY='-100px'
          offsetX='0px'
          in
        >
          <Heading mb='4' textAlign='center'>
            About CoScience
          </Heading>

          <Text my='2'>Support CoScience</Text>
          <Flex mb='3' alignItems='center'>
            <NumberInput
              maxW='100px'
              value={amount}
              onChange={handleChange}
              step={0.001}
              max={Number(ethers.utils.formatEther(state.balance))}
              min={0}
              me='2'
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Icon h='2rem' w='2rem' as={FaEthereum} />
            <Text me='4' fontSize='xl'>
              ETH
            </Text>
          </Flex>
          <Slider
            flex='1'
            focusThumbOnChange={false}
            value={amount}
            onChange={handleChange}
            step={0.001}
            max={Number(ethers.utils.formatEther(state.balance))}
            min={0}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb fontSize='sm' boxSize='20px' children={amount} />
          </Slider>
          <Button
            onClick={donate}
            display='flex'
            mx='auto'
            size='lg'
            colorScheme={scheme}
          >
            Donate
          </Button>
          <Text my='2'>{status ? `Status: ${status}` : ''}</Text>
        </SlideFade>
      </Container>

      <Container
        m='auto'
        shadow='lg'
        maxW='container.md'
        bg={bg}
        p='10'
        borderRadius='20'
      >
        <SlideFade
          threshold='0.1'
          delay={{ enter: 0.1 }}
          transition={{
            enter: { duration: 0.7 }
          }}
          offsetY='100px'
          offsetX='0px'
          in
        >
          <Heading textAlign='center'>Connection to blockchain</Heading>
          <Flex mt='5' alignItems='center'>
            <Text me='4' fontSize='lg'>
              Provider:
            </Text>
            <Box p='2' borderRadius='5' bg='green.200' shadow='md'>
              {providerType}
            </Box>
          </Flex>
          <Flex mt='5' alignItems='center'>
            <Text fontSize='lg' me='4'>
              Network:
            </Text>
            <Box p='2' borderRadius='5' bg='orange.200' shadow='md'>
              {networkName}
            </Box>
          </Flex>
          <Flex mt='5' alignItems='center'>
            <Text fontSize='lg' me='4'>
              Wallet:
            </Text>
            <Box p='2' borderRadius='5' bg='orange.400' shadow='md'>
              {providerSrc}
            </Box>
          </Flex>

          <Flex mt='5' alignItems='center'>
            <Text fontSize='lg' me='4'>
              Your address:
            </Text>
            <Box p='2' borderRadius='5' bg='blue.200' shadow='md'>
              {account}
            </Box>
          </Flex>
        </SlideFade>
      </Container>
    </>
  )
}

export default About

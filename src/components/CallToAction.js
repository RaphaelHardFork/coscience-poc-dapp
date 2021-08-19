import {
  Button,
  Flex,
  Stack,
  Heading,
  Text,
  Container
} from '@chakra-ui/react';

const CallToAction = () => {
  return (
    <Container maxW={'5xl'}>
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
          lineHeight={'110%'}
        >
          The{' '}
          <Text as={'span'} color={'orange.400'}>
            Collective
          </Text>{' '}
          Science Platform
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Science with collective intelligence and community governance
        </Text>
        <Stack spacing={6} direction={'row'}>
          <Button
            rounded={'full'}
            px={6}
            colorScheme={'orange'}
            bg={'orange.400'}
            _hover={{ bg: 'orange.500' }}
          >
            Get started
          </Button>
          <Button rounded={'full'} px={6}>
            Learn more
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
};

export default CallToAction;

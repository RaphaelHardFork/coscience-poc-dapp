import {
  Box,
  Text,
  Heading,
  AccordionItem,
  Accordion as ChakraAccordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react"

const Accordion = ({ object, type }) => {
  return (
    <ChakraAccordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {type} n°{object.id}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <Box>
            <Heading textAlign="center">
              This the {type} n°{object.id}
            </Heading>
            {type === "Article" ? (
              <>
                <Text>ID : {object.id}</Text>
                <Text>Author: {object.author} </Text>
                <Text>CoAuthor: {object.CoAuthor} </Text>
                <Text>Content banned: {object.contentBanned} </Text>
                <Text>Abstract: {object.abstractCID} </Text>
                <Text>Content: {object.contentCID} </Text>
                <Text>Nb of reviews: {object.reviews.length} </Text>
                <Text>Nb of comments: {object.comments.length} </Text>
              </>
            ) : (
              <>
                <Text>ID : {object.id}</Text>
                <Text>Author: {object.author} </Text>
                <Text>contentCID: {object.contentCID} </Text>
                <Text>Content banned: {object.contentBanned} </Text>
                <Text>On: {object.targetID} </Text>
              </>
            )}
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </ChakraAccordion>
  )
}

export default Accordion

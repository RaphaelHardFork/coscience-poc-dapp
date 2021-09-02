import {
  Box,
  Text,
  Heading,
  AccordionItem,
  Accordion as ChakraAccordion,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Button,
  Flex,
} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { useArticlesContract } from "../hooks/useArticlesContract"
import { useReviewsContract } from "../hooks/useReviewsContract"

const Accordion = ({ object, type }) => {
  const [reviews] = useReviewsContract()
  const [articles] = useArticlesContract()
  return (
    <ChakraAccordion allowToggle>
      <AccordionItem>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            {type} n°{object.id} : {type === "Comment" ? "" : object.title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <Box>
            <Heading>
              {type === "Comment" ? `Comment n°${object.id}` : object.title}
            </Heading>
            {type === "Article" ? (
              <>
                {object.coAuthor.length ? (
                  <>
                    <Text>Co-authors: </Text>{" "}
                    {object.coAuthor.map((author, index) => {
                      return (
                        <Text key={author}>{`${index + 1}: ${author}`}</Text>
                      )
                    })}
                  </>
                ) : (
                  "There is no co-author"
                )}
                <Text mt="6" textAlign="center" fontSize="md">
                  Abstract
                </Text>
                <Text mb="6" textAlign="center">
                  {object.abstract}
                </Text>
                <Flex alignItems="center" justifyContent="space-between">
                  <Button
                    as={Link}
                    to={`/article/${object.id}`}
                    colorScheme="orange"
                  >
                    Read the article
                  </Button>
                  <Box>
                    <Text textAlign="end" fontSize="md">
                      Nb of reviews: {object.reviews.length}{" "}
                    </Text>
                    <Text textAlign="end" fontSize="md">
                      Nb of comments: {object.comments.length}{" "}
                    </Text>
                  </Box>
                </Flex>
              </>
            ) : type === "Review" ? (
              <>
                <Text mt="6" fontSize="md">
                  Content
                </Text>
                <Text>{object.content}</Text>
                <Button
                  colorScheme="orange"
                  as={Link}
                  to={`/article/${object.targetID}`}
                >
                  On article n°{object.targetID}
                </Button>
              </>
            ) : (
              <>
                <Text mt="6" fontSize="md">
                  Content
                </Text>
                <Text>{object.content}</Text>
                <Button
                  disabled={object.target !== articles.address}
                  to={
                    object.target === articles.address
                      ? `/article/${object.targetID}`
                      : ""
                  }
                  colorScheme="orange"
                  as={Link}
                >
                  {" "}
                  On{" "}
                  {object.target === reviews.address
                    ? "Review"
                    : object.target === articles.address
                    ? "Article"
                    : "Comment"}{" "}
                  n°{object.targetID}
                </Button>
              </>
            )}
          </Box>
        </AccordionPanel>
      </AccordionItem>
    </ChakraAccordion>
  )
}

export default Accordion

import { Flex, Text, IconButton } from "@chakra-ui/react"
import React, { useState } from "react"
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa"
import { useArticlesContract } from "../hooks/useArticlesContract"
import { useCall } from "../web3hook/useCall"

const ArticleValidity = ({ id, article }) => {
  const { articles } = useArticlesContract()
  const [status, contractCall] = useCall()

  console.log(article.validityVotes)
  console.log(article.importanceVotes)

  async function VoteValidity(validity) {
    await contractCall(articles, "voteValidity", [validity, id])
  }

  return (
    <Flex>
      <Text>Vote Validity</Text>
      <IconButton
        aria-label="thumb ub"
        icon={<FaThumbsUp />}
        onClick={() => VoteValidity(1)}
        isLoading={status.startsWith("Waiting") || status.startsWith("Pending")}
        disabled={status.startsWith("Waiting") || status.startsWith("Pending")}
      />

      <IconButton
        aria-label="thumb down"
        icon={<FaThumbsDown />}
        isLoading={status.startsWith("Waiting") || status.startsWith("Pending")}
        disabled={status.startsWith("Waiting") || status.startsWith("Pending")}
        onClick={() => VoteValidity(0)}
      />
      <Text>
        validity: {article.validityVotes - article.validity} /{" "}
        {article.validityVotes}
      </Text>
    </Flex>
  )
}

export default ArticleValidity

// Voter 1 = +1
// voter2 = -1
// total = 0
// score = 1/2

import { IconButton } from '@chakra-ui/button'
import { Flex, Text } from '@chakra-ui/layout'
import React from 'react'
import { FaThumbsDown, FaThumbsUp } from 'react-icons/fa'
import { useArticlesContract } from '../hooks/useArticlesContract'
import { useCall } from '../web3hook/useCall'

const ArticleImportance = ({ id, article }) => {
  const { articles } = useArticlesContract()
  const [status, contractCall] = useCall()

  async function VoteImportance(Importance) {
    await contractCall(articles, 'voteImportance', [Importance, id])
  }
  return (
    <Flex>
      <Text>Vote Importance</Text>
      <IconButton
        aria-label='thumb ub'
        icon={<FaThumbsUp />}
        onClick={() => VoteImportance(1)}
        isLoading={status.startsWith('Waiting') || status.startsWith('Pending')}
        disabled={status.startsWith('Waiting') || status.startsWith('Pending')}
      />

      <IconButton
        aria-label='thumb down'
        icon={<FaThumbsDown />}
        isLoading={status.startsWith('Waiting') || status.startsWith('Pending')}
        disabled={status.startsWith('Waiting') || status.startsWith('Pending')}
        onClick={() => VoteImportance(0)}
      />
      <Text>
        {article.importanceVotes - article.importance} /{' '}
        {article.importanceVotes}
      </Text>
    </Flex>
  )
}

export default ArticleImportance

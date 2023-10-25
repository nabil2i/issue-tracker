import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusFilter from './IssueStatusFilter'
import IssuePageSize from './IssuePageSize'


const IssueActions = () => {
  return (
    <Flex justify='between'>
      <Flex gap="2">
        <IssueStatusFilter />
        <IssuePageSize />
      </Flex>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  )
}

export default IssueActions

'use client';

import { Button, TextArea, TextField } from '@radix-ui/themes'
import Link from 'next/link';
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3'>
      <TextField.Root>
        <TextField.Input placeholder='Title'/>
      </TextField.Root>
      <TextArea placeholder='Description...'/>
      <Button><Link href='/'>Submit New Issue</Link></Button>
    </div>
  )
}

export default NewIssuePage
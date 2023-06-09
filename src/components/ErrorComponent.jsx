import React from 'react'
import {
  Alert,
  AlertIcon
} from '@chakra-ui/react'


const ErrorComponent = ({ message }) => {
  return (
    <>
      <Alert status='error' w={'container.md'} position={'fixed'} bottom={'4'} left={'50%'} transform={'translateX(-50%)'} variant='left-accent'>
        <AlertIcon />
        Failed to fetch data
      </Alert>
    </>
  )
}

export default ErrorComponent
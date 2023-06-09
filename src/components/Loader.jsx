import { VStack, Box, Spinner } from '@chakra-ui/react'
import React from 'react'

const Loader = () => {
  return (
    <VStack h={'90vh'} justifyContent={'center'} alignItems={'center'}>
      <Box transform={'scale(3)'}>
          <Spinner  />
      </Box>
    </VStack>
  )
}

export default Loader
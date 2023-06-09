import React from "react"
import { Text,Heading, VStack } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


const CoinsCard = ({id,name, img, symbol, price, currencySymbol='₹'}) => {
    return(
      <Link to={`/coin/${id}`}>
          <VStack 
          p={'8'} 
          borderRadius={'lg'} 
          transition={'all 0.3s'}
          mx={'4'} 
          shadow={'lg'}
          css={{
            width: '200px',
            "&:hover": {
              transform: 'scale(1.05)'
            }
          }}
          >
            <Image src={img} w={'10'} h={'10'} alt={'Exchange'} objectFit={'contain'} />
            <Heading size={'md'} noOfLines={1} >{symbol}</Heading>
            <Text noOfLines={1}>{name}</Text>
            <Text noOfLines={1}>{price ? `Price : ${currencySymbol}${price}` : 'N/A'}</Text>
          </VStack>
      </Link>
    )
  }

export default CoinsCard
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {server} from '../index.js'
import { Container } from '@chakra-ui/react'
import Loader from './Loader'
import { Text,Heading ,Stack, HStack, VStack } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import ErrorComponent from './ErrorComponent.jsx'


const Exchanges = () => {
  const [exchanges, setExchanges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetchchanges = async() => {
      try {
        const {data} = await axios.get(`${server}/exchanges`)
        setExchanges(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }

    }
    fetchchanges()
  }, [])

  if(error) return <ErrorComponent message = {"Error while fetching"} />
  return (
    <Container maxW={'container.xl'} color={'#262626'}>
      {
        loading ? <Loader /> : <>
          <Heading css={{margin: '1rem 0'}} textAlign={'center'}>Top 100 Best Crypto Exchange Platforms</Heading>
          <HStack css={{margin: '2rem 0 1rem 0'}} p={'2'} justifyContent={'space-evenly'} sx={{flexWrap: 'wrap'}}>
            {exchanges.map((i, index) => {
              return (
                <ExchangeCard 
                key={i.id} 
                name={i.name} 
                img = {i.image} 
                rank={i.trust_score_rank} 
                url={i.url} />
              )
            })}
          </HStack>
        </>
      }
    </Container>
  )
}

const ExchangeCard = ({name, img, rank, url}) => {
  return(
    <a href={url} target='blank'>
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
          <Heading size={'md'} noOfLines={1} >{rank}</Heading>
          <Text noOfLines={1}>{name}</Text>
        </VStack>
    </a>
  )
}

export default Exchanges
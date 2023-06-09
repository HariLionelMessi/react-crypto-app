import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {server} from '../index.js'
import { Container } from '@chakra-ui/react'
import Loader from './Loader'
import { HStack} from '@chakra-ui/react'
import ErrorComponent from './ErrorComponent.jsx'
import CoinsCard from './CoinCard.jsx'
import { Button, Stack } from '@chakra-ui/react'
import { Radio, RadioGroup } from '@chakra-ui/react'


const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('inr')

  const currencySymbol = currency === 'inr' ? '₹': currency==='eur'? '€' : '$';
  const changePage = (page) => {
    setPage(page);
    setLoading(true)
  }

  const btns = new Array(100).fill(1)
  useEffect(() => {
    const fetchCoins = async() => {
      try {
        const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        setCoins(data)
        setLoading(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchCoins()
  }, [currency, page])

  if(error) return <ErrorComponent message = {"Error while fetching coins"} />
  return (
    <Container maxW={'container.xl'} color={'#262626'}>
      {
        loading ? <Loader /> : <>
        <RadioGroup p={2}  onChange={setCurrency} value={currency}>
            <Stack direction='row'>
                <Radio value='inr'>INR</Radio>
                <Radio value='eur'>EUR</Radio>
                <Radio value='usd'>USD</Radio>
            </Stack>    
        </RadioGroup>

          <HStack justifyContent={'space-evenly'} css={{margin: '2rem 0 1rem 0'}} p={'2'} sx={{flexWrap: 'wrap'}}>
            {coins.map((i, index) => {
              return (
                <CoinsCard 
                key={i.id} 
                id={i.id}
                name={i.name} 
                img = {i.image} 
                symbol={i.symbol} 
                price={i.current_price}
                currencySymbol={currencySymbol} />
              )
            })}
          </HStack>

          <HStack w={"full"} overflowX={"auto"} p={"8"}>
              {btns.map((item, index) => {
                return (
                  <Button 
                      key={index} 
                      bgColor={'blackAlpha.900'} 
                      color={'white'} 
                      onClick={() => changePage(index + 1)}>
                      {index + 1}
                  </Button>
                )
              })}
          </HStack>
        </>
      }
    </Container>
  )
}



export default Coins
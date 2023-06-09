import React, { useEffect, useState } from 'react'
import { server } from '../index.js'
import { Image, Progress, Text, HStack, VStack, Container, Box, Stack } from '@chakra-ui/react';
import Loader from './Loader.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Radio, RadioGroup } from '@chakra-ui/react'
import ErrorComponent from './ErrorComponent.jsx';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow
} from '@chakra-ui/react'
import { Badge } from '@chakra-ui/react'



const CoinDetails = () => {
  const [coin, setCoin] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState('inr')
  const currencySymbol = currency === 'inr' ? '₹' : currency === 'eur' ? '€' : '$';

  const params = useParams()
  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`)
        setCoin(data)
        setLoading(false)
        console.log(data);
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }
    fetchCoin()
  }, [params.id]);

  if (error) return <ErrorComponent message={"Error while fetching coin data"} />

  return (
    <>
      <Container maxW={'container.md'}>
        {
          loading ? (
            <Loader />
          ) :
            (
              <>
                <RadioGroup p={2} margin={'18px 0'} onChange={setCurrency} value={currency}>
                  <Stack direction='row'>
                    <Radio value='inr'>INR</Radio>
                    <Radio value='eur'>EUR</Radio>
                    <Radio value='usd'>USD</Radio>
                  </Stack>
                </RadioGroup>


                <VStack alignItems={'flex-start'}>
                  <Text fontSize={'small'} opacity={0.7}>
                    Last Updated on {Date(coin.market_data.last_updated).split('G')[0]}
                  </Text>
                  <Image margin={'18px 0'} src={coin.image.small} />

                  <Stat>
                    <StatLabel>{coin.name}</StatLabel>
                    <StatNumber>{currencySymbol}{coin.market_data.current_price[`${currency}`].toFixed(3)}</StatNumber>
                    <StatHelpText>
                      <StatArrow type={coin.market_data.price_change_percentage_24h > 0 ? 'increase' : 'decrease'} />
                      {coin.market_data.price_change_percentage_24h.toFixed(2)}%
                    </StatHelpText>
                  </Stat>

                  <Badge fontSize={'2xl'} bgColor={'blackAlpha.900'} color={'#fff'}>{`#${coin.market_cap_rank}`}</Badge>

                  <CustomBar
                    high={`${currencySymbol} ${coin.market_data.high_24h[currency]}`}
                    low={`${currencySymbol} ${coin.market_data.low_24h[currency]}`} />

                  <Box w={'full'}>
                    <Item
                      title={"Circulating Supply"}
                      value={coin.market_data.circulating_supply}
                    />
                    <Item
                      title={"Market Cap"}
                      value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                    />
                    <Item
                      title={"All Time Low"}
                      value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                    />
                    <Item
                      title={"All Time High"}
                      value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                    />
                  </Box>
                </VStack>


              </>
            )
        }
      </Container>
    </>
  )
}

const Item = ({ title, value }) => {
  return (
    <HStack fontFamily={'Bebas Neue'} justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
  );
}

const CustomBar = ({ high, low }) => {
  return (
    <VStack w={"full"} >
      <Progress value={50} colorScheme={"teal"} w={"full"} />
      <HStack justifyContent={"space-between"} w={"full"}>
        <Badge children={low} colorScheme={"red"} />
        <Text fontSize={"sm"}>24H Range</Text>
        <Badge children={high} colorScheme={"green"} />
      </HStack>
    </VStack>
  )
}

export default CoinDetails
import React from 'react'
import { Text, Box, VStack, Image } from '@chakra-ui/react'
import img from './assets/logo.png'
import { motion } from 'framer-motion'
import '../css/hero.css'

const Home = () => {
  return (
    // <Box  w={'full'} minHeight={'85vh'} backgroundColor={'rgb(14 13 13 / 92%)'}>
    //     <Image
    //      w={"full"}
    //        h={"full"}
    //       objectFit={"contain"}
    //       src={img}
    //       filter={"grayscale(1)"}
    //     />
    //   <Text
    //     fontSize={"6xl"}
    //     textAlign={"center"}
    //     fontWeight={"thin"}
    //     color={"whiteAlpha.700"}
    //     mt={"-20"}>  
    //   </Text>
    // </Box>
    <div className="hero-section">
      <img src={img} alt='img' />
      <Text fontSize={'6xl'}>Xcrypto</Text>
    </div>
  )
}

export default Home
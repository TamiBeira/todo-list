import { useState } from 'react'
import Head from 'next/head';
import { Flex, Text, Button, List, ListItem, Center, Input, Link } from '@chakra-ui/react';
import { TfiArrowLeft } from "react-icons/tfi";

import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupAPIClient } from '../../services/api'


export default function MyAcount(){
    return(
      <>
      <Head>
        <title>Minha conta</title>
      </Head>
      <Flex 
            background="todoList.900" 
            minHeight="100vh" 
            width="100%" 
            direction="column"
        >
        <Flex>
          <Text color="orange" fontSize={30} mt={10} ml={10}>
            Minha Conta
          </Text>
        </Flex>
        <Center>
          <Flex background="todoList.400" minW={550} minH={550} p={10} rounded={8} direction="column" justifyContent="space-evenly">
            <Text color="todoList.100" fontSize={20}>Editar dados cadastrais</Text>
            <Input 
              color="todoList.100"
              placeholder=''
              focusBorderColor='orange'
              variant="flushed"
              />
            <Input 
              color="todoList.100"
              placeholder=''
              focusBorderColor='orange'
              variant="flushed"
              />
            <Input 
              color="todoList.100"
              placeholder=''
              focusBorderColor='orange'
              variant="flushed"
              />
            <Flex direction="row" justifyContent="space-between">
              <Link href="/dashboard">
                <Text cursor="pointer" color="todoList.100"> <TfiArrowLeft size={28} color="#fba931"/></Text>
              </Link>
                <Button background="button.cta" _hover={{bg: "#ffb13e"}}>Atualizar dados</Button>
              </Flex>
          </Flex>
        </Center>


        </Flex>
      
      </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    try{
  
      const apiClient = setupAPIClient(ctx);
      const response = await apiClient.get('/tasks',
      {
        params:{
          status: true,
        }
      })

      if(response.data === null){
        return{
          redirect:{
            destination: '/',
            permanent: false,
          }
        }
      }
  
  
      return{
        props: {
            task: response.data
        }
      }
  
    }catch(err){
      console.log(err);
      return{
        redirect:{
          destination: '/dashboard',
          permanent: false,
        }
      }
    }
  
  })
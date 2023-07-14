import Head from 'next/head'
import {Flex, Text} from '@chakra-ui/react'

export default function Home(){
  return(
    <>
      <Head>
        <title>TodoList</title>
      </Head>
      <Flex background="todoList.900" height="100vh" alignItems="center" justifyContent="center">
        <Text color="todoList.100" fontSize={30}>Todo List</Text>
      </Flex>
    </>
  )
}
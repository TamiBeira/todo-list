import Head from 'next/head'
import {Flex, Text, Link} from '@chakra-ui/react'

export default function Home(){
  return(
    <>
      <Head>
        <title>TodoList</title>
      </Head>
      <Flex background="todoList.900" height="100vh" alignItems="center" justifyContent="center" flexDirection="column">
        <Text color="todoList.100" fontSize={30}>Todo List</Text>
        <Link href='/login'>
          <Text textDecoration="underline" color="orange">Acessar o sistema</Text>
        </Link>
      </Flex>
    </>
  )
}
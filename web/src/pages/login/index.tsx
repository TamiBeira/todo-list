import {useState, useContext} from 'react'
import Head from 'next/head'
import {Flex, Text, Center, Input, Button} from '@chakra-ui/react'
import { toast } from 'react-toastify'
import Link from 'next/link'

import {AuthContext} from '../../context/AuthContext';
import { canSSRGuest } from '../../utils/canSSRGuest'

export default function Login(){
  const {signIn} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //Logar no sistema
  async function handleLogin(){
    if(email === '' || password === ''){
      return toast.error('Favor preencher todos os campos para acesso ao sistema.')
    }
    await signIn({
      email,
      password
    })
  }


  return(
    <>
      <Head>
        <title>TodoList - Faça login para acessar!</title>
      </Head>
      <Flex background="todoList.900" height="100vh" alignItems="center" justifyContent="center">
        <Flex width={640} direction="column" p={14} rounded={8}>
            <Center p={4}>
                <Text color="todoList.100" fontSize={30}>Login</Text>
            </Center>
            <Input
                background="todoList.400"
                focusBorderColor='orange'
                variant="flushed"
                size="lg"
                placeholder='email@email.com'
                type='email'
                mb={3}
                color="todoList.100"

                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
            />
            <Input
                background="todoList.400"
                focusBorderColor='orange'
                variant="flushed"
                size="lg"
                placeholder='******'
                type='password'
                mb={3}
                color="todoList.100"

                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
            />
            <Button
                background="button.cta"
                color="gray.900"
                size="lg"
                mb={6}
                _hover={{bg: "#ffb13e"}}

                onClick={handleLogin}
            >
                Acessar
            </Button>
            <Center>
                <Link href="/register">
                    <Text cursor="pointer" color="todoList.100">Ainda não possuí conta? <strong>Cadastre-se</strong></Text>
                </Link>
            </Center>
        </Flex>
      </Flex>
    </>
  )
}


export const getServerSideProps = canSSRGuest(async (ctx) => {
  return{
    props: {}
  }
})
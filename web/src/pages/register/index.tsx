import {useState, useContext} from 'react'
import Head from 'next/head'
import {Flex, Text, Center, Input, Button} from '@chakra-ui/react'
import { toast } from 'react-toastify'

import Link from 'next/link'

import {AuthContext} from '../../context/AuthContext'
import { canSSRGuest } from '../../utils/canSSRGuest'

export default function Register(){
    const {signUp} = useContext(AuthContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //Criar cadastro
    async function handleRegister(){
        if(name ==="" || email ==="" || password === ""){
          return toast.error('Favor preencher todos os campos para cadastro!')
        }
        await signUp({
          name,
          email,
          password
        })
    }


  return(
    <>
      <Head>
        <title>Crie sua conta no TodoList</title>
      </Head>
      <Flex background="todoList.900" height="100vh" alignItems="center" justifyContent="center">
        <Flex width={640} direction="column" p={14} rounded={8}>
            <Center p={4}>
                <Text color="todoList.100" fontSize={30}>Crie sua conta no TodoList</Text>
            </Center>
            <Input
                background="todoList.400"
                variant="flushed"
                focusBorderColor='orange'
                p={5}
                size="lg"
                placeholder='Nome'
                type='text'
                mb={3}
                color="todoList.100"

                value={name}
                onChange={(e)=>{setName(e.target.value)}}
            />
            <Input
                background="todoList.400"
                variant="flushed"
                focusBorderColor='orange'
                p={5}
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
                variant="flushed"
                focusBorderColor='orange'
                p={5}
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

                onClick={handleRegister}
            >
                Cadastrar
            </Button>
            <Center>
                <Link href="/login">
                    <Text cursor="pointer" color="todoList.100">Já possuí uma conta? <strong>Faça login</strong></Text>
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
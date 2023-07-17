import { useState, useContext } from 'react'
import Head from 'next/head';
import { Flex, Text, Button, List, ListItem, Center, Input, Link } from '@chakra-ui/react';
import { TfiArrowLeft } from "react-icons/tfi";
import { FiLogOut } from "react-icons/fi";
import { toast } from 'react-toastify'

import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupAPIClient } from '../../services/api'
import { AuthContext } from '../../context/AuthContext'

interface UserProps{
  id: string;
  name: string;
  email: string;
}

interface ProfileProps{
  user: UserProps;
}


export default function MyAcount({user}:ProfileProps){
  const { logoutUser } = useContext(AuthContext);
  const [name, setName] = useState(user && user?.name)
  const [email, setEmail] = useState(user?.email ? user?.email : '')

//desconectar do sistema
  async function handleLogout(){
    await logoutUser();
  }

  async function handleUpdateUser(){

    if(name === '' || email === ''){
      return toast.error('Favor preencher todos os campos!')
    }

    try{
      const apiClient = setupAPIClient();
      await apiClient.put('/users', {
        name: name,
        email: email,
      })

      alert("Dados alterados com sucesso!");

    }catch(err){
      console.log(err);
    }
    
  }

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
        <Flex direction="row" justifyContent="space-around" mt={10}>
          <Text color="orange" fontSize={30}>
            Minha Conta
          </Text>
          <Link
              w={28}
              mb={6}
              bg="transparent"
              _hover={{ bg: 'transparent' }}
              onClick={handleLogout}
            >
              <FiLogOut size={28} color="#fba931"/>
            </Link>
        </Flex>
        <Center>
          <Flex background="todoList.400" minW={550} minH={550} p={10} rounded={8} direction="column" justifyContent="space-evenly">
            <Text color="todoList.100" fontSize={20}>Editar dados cadastrais</Text>
            <Input 
              color="todoList.100"
              placeholder=''
              focusBorderColor='orange'
              variant="flushed"
              type='text'

              value={name}
              onChange={ (e) => setName(e.target.value) }
              />
            <Input 
              color="todoList.100"
              placeholder=''
              focusBorderColor='orange'
              variant="flushed"
              type='email'

              value={email}
              onChange={ (e) => setEmail(e.target.value) }
              />
            <Flex direction="row" justifyContent="space-between">
              <Link href="/dashboard">
                <Text cursor="pointer" color="todoList.100"> <TfiArrowLeft size={28} color="#fba931"/></Text>
              </Link>
                <Button background="button.cta" _hover={{bg: "#ffb13e"}} onClick={handleUpdateUser}>Atualizar dados</Button>
              </Flex>
          </Flex>
        </Center>


        </Flex>
      
      </>
    )
}


//  export const getServerSideProps = canSSRAuth(async (ctx) => {

//   try{
//     const apiClient = setupAPIClient(ctx)
//     const response = await apiClient.put('/users')

//     const user = {
//       id: response.data.id,
//       name: response.data.name,
//       email: response.data.email,
//     }

//     return{
//       props: {
//         user: user,
//       }
//     }


//   }catch(err){
//     console.log(err);

//     return{
//       redirect:{
//         destination: '/dashboard',
//         permanent: false,
//       }
//     }
//   }

// })

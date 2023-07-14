import { useState } from 'react'
import Head from 'next/head';
import { Flex, Text, Button, List, ListItem, Center } from '@chakra-ui/react';

import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupAPIClient } from '../../services/api'

import { TfiTrash, TfiCheck, TfiPlus, TfiPencil, TfiUser } from "react-icons/tfi";
import Link from 'next/link';

interface AllTask{
    id: string;
    title_task: string;
    task: string;
    check: boolean;
    user_id: string;
}

interface TaskProps{
    task: AllTask[];
  }

export default function Dashboard({task}:TaskProps){
    const [todoList, setTodoList] = useState<AllTask[]>(task || [])
  return(
    <>
      <Head>
        <title>Todo List</title>
      </Head>
        <Flex 
            background="todoList.900" 
            minHeight="100vh" 
            width="100%" 
            direction="column" 
            justifyContent="center" 
            alignItems="center"
        >
          <Text 
            fontSize={40} 
            textAlign="center" 
            color="todoList.100"
        >
            Bem vindo as suas tarefas
        </Text>
          <Center>
                <Link href="/addTasks">
                <Flex 
                    background="button.cta" 
                    justifyContent="center" 
                    alignItems="center" 
                    w={250}
                    mb={10} 
                    p={2} 
                    rounded={8}
                >
                        <TfiPlus size={28} color="#171923"/>
                        <Text 
                            ml={3} 
                            cursor="pointer" 
                            color="gray.900" 
                            fontSize={15} 
                            fontWeight={900}
                        >
                            Cadastre uma nova tarefa
                        </Text>
                    </Flex> 
                </Link>
                <Link href="/myAcount">
                <Flex 
                    background="button.cta" 
                    justifyContent="center" 
                    alignItems="center" 
                    w={250}
                    mb={10}
                    ml={5} 
                    p={2} 
                    rounded={8}
                >
                        <TfiUser size={28} color="#171923"/>
                        <Text 
                            ml={3} 
                            cursor="pointer" 
                            color="gray.900" 
                            fontSize={15} 
                            fontWeight={900}
                        >
                            Acessar minha conta
                        </Text>
                    </Flex> 
                </Link> 
          </Center>

        {todoList.map(task => (            
        <Flex 
            backgroundColor="todoList.400" 
            width="60%" 
            justifyContent="space-between" 
            display="flex" 
            flexWrap="wrap" 
            mb={5} 
            p={5} 
            rounded={8} 
            key={task.id}
            >
                <Text 
                    width="100%" 
                    color="todoList.100" 
                    textAlign="center" 
                    mb={2} 
                    fontSize={20}>
                        <strong>{task.title_task}</strong>
                </Text>
                <List width="70%">
                    <ListItem color="todoList.100">{task.task}</ListItem>
                </List>
                <Flex justifyContent="center">
                    <Button
                        _hover={{bg: "transparent"}} 
                        title='Deletar tarefa' 
                        alignContent="center" 
                        background="transparent"
                    >
                        <TfiTrash size={28} color="#fba931"/>
                    </Button>
                    <Button 
                        _hover={{bg: "transparent"}} 
                        title='Concluir tarefa' 
                        alignContent="center"
                        background="transparent"
                    >
                        <TfiPencil size={28} color="#fba931"/>
                    </Button>
                    <Button 
                        _hover={{bg: "transparent"}} 
                        title='Concluir tarefa' 
                        alignContent="center"
                        background="transparent"
                    >
                        <TfiCheck size={28} color="#fba931"/>
                    </Button>
                </Flex>
        </Flex>
        ))}
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
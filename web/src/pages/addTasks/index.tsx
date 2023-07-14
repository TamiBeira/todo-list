import {useState} from 'react'
import Head from 'next/head'
import {Flex, Text, Center, Input, Button} from '@chakra-ui/react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import { setupAPIClient } from '@/services/api'
import { toast } from 'react-toastify'
import Link from 'next/link'

import { TfiArrowLeft } from "react-icons/tfi";



export default function Dashboard(){
    const [title_task, setTitle_task] = useState('')
    const [task, setTask] = useState('')

    async function handleRegister(){
        if(title_task === '' || task === ''){
           return toast.error('Favor preencher todos os campos!')
        }

        try {
            const apiClient = setupAPIClient()
            await apiClient.post('/tasks', {
                title_task: title_task,
                task: task 
            })
            setTitle_task('')
            setTask('')
            toast.success('Tarefa adicionada!')
        } catch (err) {
            console.log(err)
            toast.error('Erro ao cadastrar está tarefa!')
        }

    }
    return(
    <>
        <Head>
            <title>Adicione suas tarefas</title>
        </Head>

        <Center background="todoList.900" minHeight="100vh" alignContent="center" justifyContent="center">
            <Flex background="todoList.400" p={14} rounded={8} width="50%" alignContent="center" justifyContent="center">
                <Flex flexDirection="column" width="80%">
                    <Link href="/dashboard">
                        <Text cursor="pointer" color="todoList.100"> <TfiArrowLeft size={28} color="#fba931"/></Text>
                    </Link>
                    <Text mt={10} color="todoList.100" align="center" mb={5} fontSize={30}>Adicione suas tarefas</Text>
                    <Input
                        background="todoList.400"
                        color="todoList.100"
                        variant="filled"
                        size="lg"
                        mb={2}
                        placeholder='titulo da tarefa'

                        value={title_task}
                        onChange={(e)=>{setTitle_task(e.target.value)}}
                    />
                    <Input
                        background="todoList.400"
                        color="todoList.100"
                        variant="filled"
                        size="lg"
                        mb={2}
                        placeholder='descrição da tarefa'

                        value={task}
                        onChange={(e)=>{setTask(e.target.value)}}
                    />
                    <Button
                        background="button.cta"
                        color="gray.900"
                        size="lg"
                        mb={6}
                        _hover={{bg: "#ffb13e"}}

                        onClick={handleRegister}
                    >Adicionar Tarefa</Button>
                </Flex>
            </Flex>
        </Center>
    </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

    return {
      props: {
        
      }
    }
  })
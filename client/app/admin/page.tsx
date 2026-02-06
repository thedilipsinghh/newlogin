"use client"
import { useAddTodoMutation, useDeleteTodoMutation, useGetTodosQuery, useUpdateTodoMutation } from '@/redux/api/todo.api'
import { zodResolver } from '@hookform/resolvers/zod'
import { table } from 'console'
import React from 'react'
import { useForm } from 'react-hook-form'
import z, { string } from 'zod'


const Dashboard = () => {
    const { data } = useGetTodosQuery()
    const [addtodo] = useAddTodoMutation()
    const [updatetodo] = useUpdateTodoMutation()
    const [deletetodo] = useDeleteTodoMutation()
    const todoSchema = z.object({
        task: z.string().min(1),
        desc: z.string().min(1),
        priority: z.string().min(1),
    })
    type todoType = z.infer<typeof todoSchema>
    const { register, formState: { errors }, handleSubmit } = useForm<todoType>({
        defaultValues: {
            task: "",
            desc: "",
            priority: ""
        },
        resolver: zodResolver(todoSchema)
    })
    const handleCreate = (values: todoType) => {
        handleAdd(values)


    }

    const handleAdd = async (data: todoType) => {
        try {
            await addtodo(data).unwrap()
            console.log("add done")
        } catch (error) {
            console.log(error)
        }
    }
    const handleupdate = async (data: todoType, iscomplete: boolean) => {
        try {
            await updatetodo({ ...data, complete: iscomplete }).unwrap()
            console.log("update done")
        } catch (error) {
            console.log(error)
        }
    }
    const handledelete = async (_id: string) => {
        try {
            await deletetodo(_id).unwrap()
            console.log("delete done")
        } catch (error) {
            console.log(error)
        }
    }
    return <>
        <form onSubmit={handleSubmit(handleCreate)}>
            <input  {...register("task")} type="text" placeholder='Enter task' />
            <input  {...register("desc")} type="text" placeholder='Enter desc' />
            <select {...register("priority")} >
                <option value="">Choose priority</option>
                <option value="high">high</option>
                <option value="medium">medium</option>
                <option value="low">low</option>
            </select>
            <button type='submit'>add Todo</button>
        </form>
        {
            data && <table>
                <thead>
                    <th>id</th>
                    <th>task</th>
                    <th>desc</th>
                    <th>priority</th>
                    <th>complete</th>
                    <th>action</th>
                </thead>
                <tbody>
                    {
                        data.map(item => <tr key={item._id}
                            className={item.complete ? "bg-green-400" : "bg-red-400"}>
                            <td>{item._id}</td>
                            <td>{item.task}</td>
                            <td>{item.desc}</td>
                            <td>{item.priority}</td>
                            <td>{item.complete ? "complete" : "Pending"}</td>
                            <td>
                                {
                                    item.complete
                                        ? <button onClick={e => handleupdate(item, false)} >mark  in complete</button>
                                        : <button onClick={e => handleupdate(item, true)} >mark complete</button>
                                }
                                <button onClick={e => handledelete(item._id as string)}>remove</button>
                            </td>
                        </tr>)
                    }
                </tbody>
            </table>

        }
    </>
}

export default Dashboard
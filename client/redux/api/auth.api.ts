import { Todo } from "@/type/Todo"
import { User } from "@/type/User"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        // baseUrl: "http://localhost:5000/api/auth",
        baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth`,
        credentials: "include"

    }),
    tagTypes: [],
    endpoints: (builder) => {
        return {
            signup: builder.mutation<void, User>({
                query: userdata => {
                    return {
                        url: "/signup",
                        method: "POST",
                        body: userdata
                    }
                },
            }),
            signin: builder.mutation<void, User>({
                query: userdata => {
                    return {
                        url: "/signin",
                        method: "POST",
                        body: userdata
                    }
                },
            }),
            signout: builder.mutation<void, User>({
                query: userdata => {
                    return {
                        url: "/signout",
                        method: "POST",
                        body: userdata
                    }
                },
            }),
        }
    }
})

export const { useSignupMutation, useSigninMutation, useSignoutMutation } = authApi

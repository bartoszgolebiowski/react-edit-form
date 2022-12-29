import { useQuery } from '@tanstack/react-query'
import { getComments, getPosts, getUsers } from './api'

export const useSelectValues = (
    users: string[],
    posts: string[],
) => {
    const usersQuery = useQuery({
        queryKey: ['users'],
        queryFn: getUsers,
        initialData: [],
        select: (data) => data.map(user => ({ id: user.id, display: user.name }))
    })

    const postsQuery = useQuery({
        queryKey: ['posts', users],
        queryFn: () => getPosts(users),
        initialData: [],
        select: (data) => data.map(post => ({ id: post.id, display: post.title, parentId: post.parentId }))
    })

    const commentsQuery = useQuery({
        queryKey: ['comments', posts],
        queryFn: () => getComments(posts),
        initialData: [],
        select: (data) => data.map(comment => ({ id: comment.id, display: comment.body, parentId: comment.parentId }))
    })

    return {
        userOptions: usersQuery.data,
        postOptions: postsQuery.data,
        commentOptions: commentsQuery.data
    }
}
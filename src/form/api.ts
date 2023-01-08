const URL = 'https://jsonplaceholder.typicode.com'

type WithParentId<T> = T & { parentId: string }

interface User {
    id: number
    name: string
    username: string
    email: string
    address: Address
    phone: string
    website: string
    company: Company
}

interface Address {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: Geo
}

interface Geo {
    lat: string
    lng: string
}

interface Company {
    name: string
    catchPhrase: string
    bs: string
}


export const getUsers = (): Promise<User[]> =>
    fetch(`${URL}/users`)
        .then((res) => res.json())


interface Post {
    userId: number
    id: number
    title: string
    body: string
}

export const getPosts = (userIds: string[]) =>
    userIds.length > 0
        ? Promise.all(userIds.map(getPost)).then((posts) => posts.flat())
        : Promise.resolve([]);

export const getPost = (userId: string): Promise<WithParentId<Post>[]> =>
    fetch(`${URL}/users/${userId}/posts`)
        .then((res) => res.json())
        .then((posts: Post[]) => posts.map((post) => ({ ...post, parentId: userId })))

interface Comment {
    postId: number
    id: number
    name: string
    email: string
    body: string
}

export const getComments = (postIds: string[]) =>
    postIds.length > 0
        ? Promise.all(postIds.map(getComment)).then((comments) => comments.flat())
        : Promise.resolve([]);

export const getComment = (postId: string): Promise<WithParentId<Comment>[]> =>
    fetch(`${URL}/posts/${postId}/comments`)
        .then((res) => res.json())
        .then((comments: Comment[]) => comments.map((comment) => ({ ...comment, parentId: postId })))
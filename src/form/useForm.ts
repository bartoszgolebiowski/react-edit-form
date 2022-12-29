import { useReducer } from "react";
import { formReducer, handleChange, initialValues, selectComments, selectPosts, selectUsers } from "./formReducer";

export const useForm = (initial = initialValues) => {
    const [values, dispatch] = useReducer(formReducer, initial)

    return {
        values,
        onSubmit: () => {
            alert(JSON.stringify({
                users: selectUsers(values),
                posts: selectPosts(values),
                comments: selectComments(values)
            }))
        },
        onChange: (payload: Parameters<typeof handleChange>[0]) =>
            dispatch(handleChange(payload))
    }
}

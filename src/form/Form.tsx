import React from "react";
import {
  initialValues as initial,
  selectComments,
  selectPosts,
  selectUsers,
} from "./formReducer";
import { useForm } from "./useForm";
import { useSelectValues } from "./useSelectValues";

type Props = {
  initialValues?: typeof initial;
};

const Form = (props: Props) => {
  const { initialValues = initial } = props;
  const { values, onChange, onSubmit } = useForm(initialValues);
  const users = selectUsers(values);
  const posts = selectPosts(values);
  const comments = selectComments(values);
  const { commentOptions, postOptions, userOptions } = useSelectValues(
    users,
    posts
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const handleChange =
    (level: number) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const id = parseInt(e.target.value, 10) + "";
      if (level === 0) {
        onChange({ id, level, parentId: null });
        return;
      }
      const parentId =
        e.target.selectedOptions[0].getAttribute("data-parentid");

      if (parentId) {
        onChange({ id, level, parentId });
        return;
      }
    };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="users">
          Users
          <select multiple onChange={handleChange(0)} value={users} id="users">
            {userOptions.map((element) => (
              <option
                key={element.id}
                value={element.id}
                data-selected={users.includes(String(element.id))}
              >
                {element.display}
              </option>
            ))}
          </select>
        </label>
      </p>
      <p>
        <label htmlFor="posts">
          Posts
          <select multiple onChange={handleChange(1)} value={posts} id="posts">
            {postOptions.map((element) => (
              <option
                key={element.id}
                value={element.id}
                data-parentid={element.parentId}
                data-selected={posts.includes(String(element.id))}
              >
                {element.display}
              </option>
            ))}
          </select>
        </label>
      </p>
      <p>
        <label htmlFor="comments">
          Comments
          <select
            multiple
            id="comments"
            value={comments}
            onChange={handleChange(2)}
          >
            {commentOptions.map((element) => (
              <option
                key={element.id}
                value={element.id}
                data-parentid={element.parentId}
                data-selected={comments.includes(String(element.id))}
              >
                {element.display}
              </option>
            ))}
          </select>
        </label>
      </p>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;

import * as React from "react";
import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSelectValues } from "../useSelectValues";

const renderHookWithProvider = (
  users = [] as string[],
  posts = [] as string[]
) => {
  const client = new QueryClient();
  const Wrapper = ({ children }: { children: React.ReactElement }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );

  return renderHook(() => useSelectValues(users, posts), {
    wrapper: Wrapper,
  });
};

describe("useSelectValues", () => {
  it("should return only users options", async () => {
    const result = renderHookWithProvider();
    await waitFor(() =>
      expect(result.result.current.userOptions).toStrictEqual([
        {
          display: "Leanne Graham",
          id: 1,
        },
        {
          display: "Ervin Howell",
          id: 2,
        },
        {
          display: "Clementine Bauch",
          id: 3,
        },
        {
          display: "Patricia Lebsack",
          id: 4,
        },
        {
          display: "Chelsey Dietrich",
          id: 5,
        },
        {
          display: "Mrs. Dennis Schulist",
          id: 6,
        },
        {
          display: "Kurtis Weissnat",
          id: 7,
        },
        {
          display: "Nicholas Runolfsdottir V",
          id: 8,
        },
        {
          display: "Glenna Reichert",
          id: 9,
        },
        {
          display: "Clementina DuBuque",
          id: 10,
        },
      ])
    );
  });

  it("should return users options and posts options", async () => {
    const result = renderHookWithProvider(["1"]);
    await waitFor(() =>
      expect(result.result.current.userOptions).toStrictEqual([
        {
          display: "Leanne Graham",
          id: 1,
        },
        {
          display: "Ervin Howell",
          id: 2,
        },
        {
          display: "Clementine Bauch",
          id: 3,
        },
        {
          display: "Patricia Lebsack",
          id: 4,
        },
        {
          display: "Chelsey Dietrich",
          id: 5,
        },
        {
          display: "Mrs. Dennis Schulist",
          id: 6,
        },
        {
          display: "Kurtis Weissnat",
          id: 7,
        },
        {
          display: "Nicholas Runolfsdottir V",
          id: 8,
        },
        {
          display: "Glenna Reichert",
          id: 9,
        },
        {
          display: "Clementina DuBuque",
          id: 10,
        },
      ])
    );
    await waitFor(() =>
      expect(result.result.current.postOptions).toStrictEqual([
        {
          display:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          id: 1,
          parentId: "1",
        },
        {
          display: "qui est esse",
          id: 2,
          parentId: "1",
        },
        {
          display:
            "ea molestias quasi exercitationem repellat qui ipsa sit aut",
          id: 3,
          parentId: "1",
        },
        {
          display: "eum et est occaecati",
          id: 4,
          parentId: "1",
        },
        {
          display: "nesciunt quas odio",
          id: 5,
          parentId: "1",
        },
        {
          display: "dolorem eum magni eos aperiam quia",
          id: 6,
          parentId: "1",
        },
        {
          display: "magnam facilis autem",
          id: 7,
          parentId: "1",
        },
        {
          display: "dolorem dolore est ipsam",
          id: 8,
          parentId: "1",
        },
        {
          display: "nesciunt iure omnis dolorem tempora et accusantium",
          id: 9,
          parentId: "1",
        },
        {
          display: "optio molestias id quia eum",
          id: 10,
          parentId: "1",
        },
      ])
    );
  });

  it("should return users posts and comments options", async () => {
    const result = renderHookWithProvider(["1"], ["2"]);
    await waitFor(() =>
      expect(result.result.current.userOptions).toStrictEqual([
        {
          display: "Leanne Graham",
          id: 1,
        },
        {
          display: "Ervin Howell",
          id: 2,
        },
        {
          display: "Clementine Bauch",
          id: 3,
        },
        {
          display: "Patricia Lebsack",
          id: 4,
        },
        {
          display: "Chelsey Dietrich",
          id: 5,
        },
        {
          display: "Mrs. Dennis Schulist",
          id: 6,
        },
        {
          display: "Kurtis Weissnat",
          id: 7,
        },
        {
          display: "Nicholas Runolfsdottir V",
          id: 8,
        },
        {
          display: "Glenna Reichert",
          id: 9,
        },
        {
          display: "Clementina DuBuque",
          id: 10,
        },
      ])
    );
    await waitFor(() =>
      expect(result.result.current.postOptions).toStrictEqual([
        {
          display:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          id: 1,
          parentId: "1",
        },
        {
          display: "qui est esse",
          id: 2,
          parentId: "1",
        },
        {
          display:
            "ea molestias quasi exercitationem repellat qui ipsa sit aut",
          id: 3,
          parentId: "1",
        },
        {
          display: "eum et est occaecati",
          id: 4,
          parentId: "1",
        },
        {
          display: "nesciunt quas odio",
          id: 5,
          parentId: "1",
        },
        {
          display: "dolorem eum magni eos aperiam quia",
          id: 6,
          parentId: "1",
        },
        {
          display: "magnam facilis autem",
          id: 7,
          parentId: "1",
        },
        {
          display: "dolorem dolore est ipsam",
          id: 8,
          parentId: "1",
        },
        {
          display: "nesciunt iure omnis dolorem tempora et accusantium",
          id: 9,
          parentId: "1",
        },
        {
          display: "optio molestias id quia eum",
          id: 10,
          parentId: "1",
        },
      ])
    );
    await waitFor(() =>
      expect(result.result.current.commentOptions).toMatchInlineSnapshot(`
        [
          {
            "display": "laudantium enim quasi est quidem magnam voluptate ipsam eos
        tempora quo necessitatibus
        dolor quam autem quasi
        reiciendis et nam sapiente accusantium",
            "id": 1,
            "parentId": "2",
          },
          {
            "display": "est natus enim nihil est dolore omnis voluptatem numquam
        et omnis occaecati quod ullam at
        voluptatem error expedita pariatur
        nihil sint nostrum voluptatem reiciendis et",
            "id": 2,
            "parentId": "2",
          },
          {
            "display": "quia molestiae reprehenderit quasi aspernatur
        aut expedita occaecati aliquam eveniet laudantium
        omnis quibusdam delectus saepe quia accusamus maiores nam est
        cum et ducimus et vero voluptates excepturi deleniti ratione",
            "id": 3,
            "parentId": "2",
          },
          {
            "display": "non et atque
        occaecati deserunt quas accusantium unde odit nobis qui voluptatem
        quia voluptas consequuntur itaque dolor
        et qui rerum deleniti ut occaecati",
            "id": 4,
            "parentId": "2",
          },
          {
            "display": "harum non quasi et ratione
        tempore iure ex voluptates in ratione
        harum architecto fugit inventore cupiditate
        voluptates magni quo et",
            "id": 5,
            "parentId": "2",
          },
        ]
      `)
    );
  });
});

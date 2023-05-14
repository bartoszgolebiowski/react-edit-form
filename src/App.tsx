import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Form from "./form/Form";
import React from "react";

const queryClient = new QueryClient();

const initialValues = {
  "1": {
    "1": { "1": {}, "2": {} },
    "3": {},
    "4": {},
  },
};

const App = () => {
  const [key, setKey] = React.useState(String(Date.now()));
  const [key2, setKey2] = React.useState(String(Date.now()));
  const generateKey = () => setKey(String(Date.now()));
  const generateKey2 = () => setKey2(String(Date.now()));

  return (
    <QueryClientProvider client={queryClient}>
      <fieldset>
        <Form key={key} />
        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit">Submit</button>
          <button
            onClick={generateKey}
            style={{
              display: "inline",
              padding: "1rem",
              outline: "3px red dotted",
            }}
          >
            Restore initial state
          </button>
        </div>
      </fieldset>
      <fieldset>
        <Form key={key2} initialValues={initialValues} />
        <div style={{ display: "flex", gap: "1rem" }}>
          <button type="submit">Submit</button>
          <button
            onClick={generateKey2}
            style={{
              display: "inline",
              padding: "1rem",
              outline: "3px red dotted",
            }}
          >
            Restore initial state
          </button>
        </div>
      </fieldset>
      <fieldset>
        <form>
          <p>
            <label htmlFor="first">
              First:
              <input type="text" id="first" defaultValue="1" />
            </label>
          </p>
          <p>
            <label htmlFor="second">
              Second:
              <input type="text" id="second" defaultValue="2" />
            </label>
          </p>
          <p>
            <label htmlFor="third">
              Third:
              <input type="text" id="third" defaultValue="3" />
            </label>
          </p>
          <div style={{ display: "flex", gap: "1rem" }}>
            <button type="submit">Submit</button>
            <button
              type="reset"
              style={{
                display: "inline",
                padding: "1rem",
                outline: "3px red dotted",
              }}
            >
              Restore initial state
            </button>
          </div>
        </form>
      </fieldset>
    </QueryClientProvider>
  );
};

export default App;

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
  const generateKey = () => setKey(String(Date.now()));

  return (
    <QueryClientProvider client={queryClient}>
      <Form>
        <button type="submit">Submit</button>
      </Form>
      <fieldset>
        <Form key={key} initialValues={initialValues} />
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
    </QueryClientProvider>
  );
};

export default App;

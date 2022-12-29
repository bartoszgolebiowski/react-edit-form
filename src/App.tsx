import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Form from "./form/Form";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Form />
      <Form
        initialValues={{
          "1": {
            "1": { "1": {}, "2": {} },
            "3": {},
            "4": {},
          },
        }}
      />
    </QueryClientProvider>
  );
};

export default App;

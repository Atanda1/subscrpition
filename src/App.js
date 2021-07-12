import logo from './logo.svg';
import './App.css';
import Subscription from "./pages/subscription"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";


const link = new WebSocketLink({
  uri: `ws://localhost:4000/`,
  options: {
    reconnect: true,
  },
});
const client = new ApolloClient({
  link,
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Subscription />
  </ApolloProvider>
  );
}

export default App;

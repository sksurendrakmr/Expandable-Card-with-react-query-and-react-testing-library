import React from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import "./App.css";
import { UserProfileCardProps } from "./component/UserProfileCard/UserProfileCard";
import { UserProfileCards } from "./component/UserProfileCard/UserProfileCards";

export const getUserProfileProps = (): UserProfileCardProps => ({
  name: "Surendra Kumar",
  username: "sksuri",
  phone: "990909090",
  email: "sk@gmail.com",
  address: "bbsr",
  image: "https://via.placeholder.com/600/771796",
  website: "sk.com",
});
function App() {
  const client = new QueryClient();
  return (
    <div>
      <QueryClientProvider client={client}>
        {/* <UserProfileCard {...getUserProfileProps()} /> */}
        <UserProfileCards />
      </QueryClientProvider>
    </div>
  );
}

export default App;

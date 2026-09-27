import { useState } from "react";
import WeddingCard from "./components/WeddingCard";
import WeddingInvitation from "./components/WeddingInvitation";

function App() {
  const [isOpened, setIsOpened] = useState(false);

  return isOpened ?
      <WeddingInvitation />
    : <WeddingCard onOpen={() => setIsOpened(true)} />;
}

export default App;

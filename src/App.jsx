import { useState } from "react";
import WeddingCard from "./components/WeddingCard";
import WeddingInvitation from "./components/WeddingInvitation";

function App() {
  const [opened, setOpened] = useState(false);

  return (
    <main className='min-h-screen overflow-hidden bg-[#F8F1E7]'>
      {!opened ?
        <WeddingCard onOpen={() => setOpened(true)} />
      : <WeddingInvitation />}
    </main>
  );
}

export default App;

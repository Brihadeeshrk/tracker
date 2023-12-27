import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export default async function Home() {
  const session = await getServerSession();

  console.log("SESSIONLOL", session);

  return <main>hello world</main>;
}

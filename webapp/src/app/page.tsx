// import Image from "next/image";
// import styles from "./page.module.css";
// import Link from "next/link";
import { getSession } from "@/actions";


export default async function Home() {
  const session = await getSession();
  if (session && session.user) {
    return (
        <div>
            <h1>Wellcome to the FORTNOXLINK HOME PAGE</h1>
        </div>
    );
  }
}

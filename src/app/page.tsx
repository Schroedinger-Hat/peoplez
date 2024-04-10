import {inDevEnvironment} from "@/lib/envs";
import {DevPage} from "@/app/devPage";
import {redirect} from "next/navigation";

export default async function HomePage() {
    if (inDevEnvironment) return <DevPage/>
    else redirect('/members')
}




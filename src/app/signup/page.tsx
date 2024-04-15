import SignupForm from "@/app/signup/form";
import {db} from "@/services/db";

function getData() {
    return db.membershipTemplate.findMany({
        orderBy: [{
            priceAmount: 'asc'
        }]
    })
}

export default async function SignupPage() {
    const membershipTemplates = await getData()

    return <>
        <SignupForm membershipTemplates={membershipTemplates}/>
    </>
}
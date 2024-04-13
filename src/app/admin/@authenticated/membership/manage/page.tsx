import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import {db} from "@/services/db";
import {MembershipTemplate} from "@prisma/client";
import {Button} from "@/components/ui/button";
import {Pencil1Icon} from "@radix-ui/react-icons";
import Link from "next/link";

async function getData() {
    return db.membershipTemplate.findMany({
        orderBy: [
            {
                id: 'desc'
            }
        ]
    })
}

export default async function AdminMembershipPage() {
    const membershipTemplates = await getData()

    return (
        <>
            <div className="flex justify-end">
                <Link href={'/admin/membership/manage/create'} passHref>
                    <Button>Create</Button>
                </Link>
            </div>
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            membershipTemplates.map((membershipTemplate: MembershipTemplate) => (
                                <TableRow key={membershipTemplate.id}>
                                    <TableCell>{membershipTemplate.id}</TableCell>
                                    <TableCell className="font-medium">{membershipTemplate.title}</TableCell>
                                    <TableCell><FormatPrice element={membershipTemplate}/></TableCell>
                                    <TableCell className={'flex justify-end'}>
                                        <Link href={`/admin/membership/manage/edit/${membershipTemplate.id}`}>
                                            <Button variant={'outline'} size={'xs'}>
                                                <Pencil1Icon/>
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </div>
        </>
    );
}

function FormatPrice({element}: any) {
    const moneyFormatter = new Intl.NumberFormat("en-US", {
        currency: element.priceUnit,
        minimumFractionDigits: 2,
        style: "currency",
    });

    return <span>{moneyFormatter.format(element.priceAmount / 100)}</span>
}
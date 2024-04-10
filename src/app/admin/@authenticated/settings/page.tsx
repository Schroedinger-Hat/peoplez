import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default async function AdminPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Organisation Name</CardTitle>
        <CardDescription>
          Used to identify your organisation in all the pages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <Input placeholder="My awesome nonprofit" />
        </form>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button>Save</Button>
      </CardFooter>
    </Card>
  );
}

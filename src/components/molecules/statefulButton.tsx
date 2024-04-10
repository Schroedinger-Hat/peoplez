import {Button, type ButtonProps} from "@/components/ui/button";
import {noop} from "lodash";

interface StatefulButtonProps extends ButtonProps {
    loading: boolean
}

export function StatefulButton({loading, children, ...props}: StatefulButtonProps) {
    if (loading) return <Button {...props} onClick={noop} disabled={true}>Loading...</Button>
    else return <Button {...props}>{children}</Button>
}
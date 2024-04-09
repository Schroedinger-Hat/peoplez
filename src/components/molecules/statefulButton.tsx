import {Button, type ButtonProps} from "@/components/ui/button";

interface StatefulButtonProps extends ButtonProps {
    loading: boolean
}

const noop = () => {}

export function StatefulButton({loading, children, ...props}: StatefulButtonProps) {
    if (loading) return <Button {...props} onClick={noop} disabled={true}>Loading...</Button>
    else return <Button {...props}>{children}</Button>
}
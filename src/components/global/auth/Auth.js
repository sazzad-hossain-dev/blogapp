import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import React from "react";

export function Auth(Component) {
    return function WithAuth(props) {
        const router = useRouter();
        const user = useAppSelector((state) => state?.auth?.user);

        React.useEffect(() => {
            if (!user) {
                router.push("/login");
            }
        }, [user, router]);

        if (!user) {
            return (
                <div className="flex items-center justify-center h-screen">
                    Redirecting...
                </div>
            );
        }

        return <Component {...props} />;
    };
}

import { SignIn } from "@clerk/nextjs";
import React from "react";

function SignInPage() {
    return (
        <main className="h-screen w-full flex-center">
            <SignIn />
        </main>
    );
}

export default SignInPage;

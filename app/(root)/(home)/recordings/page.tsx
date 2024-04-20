import CallList from "@/components/CallList";
import React from "react";

function Recordings() {
    return (
        <section className="flex size-full flex-col ga-10 text-white">
            <h1 className="text-3xl font-bold">Recordings</h1>

            <CallList type="recordings" />
        </section>
    );
}

export default Recordings;

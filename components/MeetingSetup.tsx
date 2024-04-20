"use client";

import { Button } from "@/components/ui/button";
import {
    DeviceSettings,
    VideoPreview,
    useCall
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";

function MeetingSetup({
    setIsSetupComplete
}: {
    setIsSetupComplete: (value: boolean) => void;
}) {
    const [isMyCamToggleOn, setIsMyCamToggleOn] = useState(false);
    const call = useCall();

    if (!call) {
        throw new Error("useCall must be used within StreamCall component");
    }

    useEffect(() => {
        if (isMyCamToggleOn) {
            call?.camera?.disable();
            call?.microphone?.disable();
        } else {
            call?.camera?.enable();
            call?.microphone?.enable();
        }
    }, [isMyCamToggleOn, call?.camera, call?.microphone]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
            <h1 className="text-2xl font-bold">Setup</h1>
            <VideoPreview />
            <div className="flex h-16 items-center justify-center gap-3">
                <label className="flex items-center justify-center gap-2 font-medium">
                    <input
                        type="checkbox"
                        checked={isMyCamToggleOn}
                        onChange={(e) => setIsMyCamToggleOn(e.target.checked)}
                    />
                    Join width mic and camera off
                </label>

                <DeviceSettings />
            </div>

            <Button
                className="rounded-md bg-green-400 px-4 py-2.5"
                onClick={() => {
                    call.join();
                    setIsSetupComplete(true);
                }}
            >
                Join meeting
            </Button>
        </div>
    );
}

export default MeetingSetup;

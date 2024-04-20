import EndCallButton from "@/components/EndCallButton";
import Loader from "@/components/Loader";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import {
    CallControls,
    CallParticipantsList,
    CallStatsButton,
    CallingState,
    PaginatedGridLayout,
    SpeakerLayout,
    useCallStateHooks
} from "@stream-io/video-react-sdk";
import { LayoutList, Users } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

function MeetingRoom() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isPersonalRoom = !!searchParams.get("personal");
    const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
    const [showParticipants, setShowParticipants] = useState(true);

    const { useCallCallingState } = useCallStateHooks();
    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) {
        return <Loader />;
    }

    const CallLayout = () => {
        switch (layout) {
            case "grid":
                return <PaginatedGridLayout />;
            case "speaker-right":
                return <SpeakerLayout participantsBarPosition="left" />;
            case "speaker-left":
                return <SpeakerLayout participantsBarPosition="right" />;
        }
    };

    return (
        <section className="relative h-screen w-full overflow-auto pt-4 text-white">
            <div className="relative flex items-center justify-center size-full">
                <div className="flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div
                    className={cn("h-[calc(100vh-86px)] hidden ml-2", {
                        "show-block": showParticipants
                    })}
                >
                    <CallParticipantsList
                        onClose={() => setShowParticipants(false)}
                    />
                </div>
            </div>

            <div className="fixed bottom-0 flex w-full justify-center items-center gap-5 flex-wrap">
                <CallControls
                    onLeave={() => {
                        router.push("/");
                    }}
                />

                <DropdownMenu>
                    <div className="flex items-center">
                        <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                            <LayoutList size={20} className="text-white" />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
                        {["Grid", "Speaker-Left", "Speaker-Right"].map(
                            (item, index) => (
                                <div key={index}>
                                    <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={() =>
                                            setLayout(
                                                item.toLocaleLowerCase() as CallLayoutType
                                            )
                                        }
                                    >
                                        {item}
                                    </DropdownMenuItem>

                                    <DropdownMenuSeparator className="border-dark-1" />
                                </div>
                            )
                        )}
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>

                <CallStatsButton />

                <button onClick={() => setShowParticipants((pre) => !pre)}>
                    <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                        <Users size={20} className="text-white" />
                    </div>
                </button>

                {!isPersonalRoom && <EndCallButton />}
            </div>
        </section>
    );
}

export default MeetingRoom;

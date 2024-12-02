'use client'

import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

export default function CustomTrigger() {
    const { state, toggleSidebar } = useSidebar()
    const isOpen = state === "expanded"

    return (
        <div>
            <button
                onClick={toggleSidebar}
                className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2",
                    "text-sm font-medium text-neutral-900",
                    "hover:bg-neutral-100 active:bg-neutral-200",
                    "transition-colors duration-200"
                )}
            >
                {isOpen
                    ? <>
                        <PanelLeftClose />
                        <span>Close</span>
                    </>
                    : <> <PanelLeftOpen />
                        <span>Open</span>
                    </>
                }
            </button>
        </div>
    )
}
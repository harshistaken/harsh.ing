import { BookCallButton } from "@/components/ui/book-call-button";

export function HeroCta() {
    return (
        <div className="flex items-end justify-between">
            <span className="font-fragment text-[14px] text-text-tertiary">wanna talk?</span>
            <BookCallButton />
        </div>
    );
}

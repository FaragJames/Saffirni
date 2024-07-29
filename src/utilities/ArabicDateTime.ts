export default function toArabicDateTime(date: string | null | undefined): string {
    

    return date ? new Date(date).toLocaleString("ar", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    }) :
                    ""
}
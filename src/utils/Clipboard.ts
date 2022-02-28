
declare const ClipboardItem: any;

export default class Clipboard {
    public static hasSupport(): boolean {
        return !!(window as any).ClipboardItem && window.isSecureContext;
    }

    public static copyImage(src: string): void {
        /*
         * in iOS we have to use a promise for the ClipboardItem,
         * but this is not supported everywhere.
         * https://bugs.webkit.org/show_bug.cgi?id=222262
         */
        try {
            (navigator.clipboard as any).write([new ClipboardItem({
                'image/png': new Promise(async (resolve) => {
                    const response = await fetch(src);

                    resolve(response.blob());
                }),
            })]);
        } catch {
            Clipboard.copyImageAsync(src);
        }
    }

    private static async copyImageAsync(src: string): Promise<void> {
        const response = await fetch(src);
        const blob = await response.blob();

        (navigator.clipboard as any).write([new ClipboardItem({
            'image/png': blob,
        })]);
    }
}
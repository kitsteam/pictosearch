
declare const ClipboardItem: any;

export default class Clipboard {
    public static hasSupport(): boolean {
        return !!(window as any).ClipboardItem && window.isSecureContext;
    }

    public static async copyImage(src: string): Promise<void> {
        const response = await fetch(src);
        const blob = await response.blob();

        (navigator.clipboard as any).write([new ClipboardItem({
            'image/png': blob,
        })]);
    }
}
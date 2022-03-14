class Cache<Type = any> {
    protected cache: { [key: string]: Type } = {};

    protected getResolves: { [key: string]: ((value: Type | undefined) => void)[] } = {};

    protected constructor() {

    }

    public add(key: string, entry: Type) {
        if (this.getResolves[key]) {
            this.getResolves[key].forEach(resolve => resolve(entry));
            this.getResolves[key] = [];
        }

        this.cache[key] = entry;
    }

    public remove(key: string) {
        delete this.cache[key];
    }

    public get(key: string): Type | undefined {
        return this.cache[key];
    }

    public getAll(): [string, Type][] {
        return Object.entries(this.cache);
    }

    public waitAndGet(key: string): Promise<Type | undefined> {
        const value = this.get(key);

        if (value) {
            return Promise.resolve(value);
        }

        return new Promise<Type | undefined>(resolve => {
            if (!this.getResolves[key]) {
                this.getResolves[key] = [];
            }

            this.getResolves[key].push(resolve);
        });
    }
}

export class ImageCache extends Cache<string> {
    protected static instance = new ImageCache();

    public static get() {
        return this.instance;
    }
}
const cache = new Map<string, any>();

export function wrapPromise<T>(promise: Promise<T>, key: string): T {
    if (!cache.has(key)) {
        // Le statut initial est 'pending'
        const suspender = promise.then(
            (result) => {
                cache.set(key, { status: 'success', result });
                return result;
            },
            (error) => {
                cache.set(key, { status: 'error', result: error });
                throw error;
            }
        );
        cache.set(key, { status: 'pending', result: suspender });
    }

    const entry = cache.get(key)!;

    if (entry.status === 'pending') {
        throw entry.result; // Suspend! React intercepte ça.
    }

    if (entry.status === 'error') {
        throw entry.result; // Lance une erreur
    }

    return entry.result; // Retourne le résultat
}
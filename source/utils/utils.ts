export const second             = 1000;
export const minute             = second * 60;
export const hour               = minute * 60;
export const day 				= hour * 24;
export const weekInSeconds      = (60 ** 2) * 24 * 7;
export const weekInMilliseconds = weekInSeconds * 1000;

const urlPattern = /(https?:\/\/)?[\w-]+\.[\w-]+[^ ]*/g;

export const hasUrl = (text: string) => urlPattern.test(text);

export const forEachUrl = (text: string, callback: (url: URL) => void) => {
    const matchedUrls = encodeURI(text).match(urlPattern);
    
    if (!matchedUrls) return;

    for (let url of matchedUrls)
    {
        if (!url.startsWith("http") && !url.startsWith("https")) url = "https://" + url;

        const encodedUrl = new URL(url);
        callback(encodedUrl);
    }
}
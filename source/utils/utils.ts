export const second             = 1000;
export const minute             = second * 60;
export const hour               = minute * 60;
export const day 				= hour * 24;
export const weekInSeconds      = (60 ** 2) * 24 * 7;
export const weekInMilliseconds = weekInSeconds * 1000;

const urlPattern = /(https?:\/\/)?[\w-]+\.[\w-]+[^ ]*/g;

type URLSet = Set<URL>;

export const hasUrl = (text: string) => urlPattern.test(text);

export const getUrls = (text: string): URLSet => {
    const matchedUrls = encodeURI(text).match(urlPattern) as RegExpMatchArray;

    const urlSet = new Set<URL>();

    for (let urlIndex in matchedUrls)
    {
        let url = matchedUrls[urlIndex];

        if (!url.startsWith("http")) url = "https://" + url;

        console.log("URL obtida:", url);
        
        urlSet.add(new URL(url));
    }

    return urlSet;
}
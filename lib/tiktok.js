import axios from "axios"

function RapidApiInit(url) {
    const _key = "JTJGMCUyRmIlMkY4JTJGMyUyRjglMkY4JTJGYiUyRjclMkY3JTJGNSUyRm0lMkZzJTJGaCUyRjQlMkYwJTJGOCUyRjQlMkY5JTJGOCUyRjYlMkYxJTJGMyUyRjAlMkY4JTJGYiUyRmUlMkY3JTJGMCUyRnAlMkYxJTJGNyUyRmMlMkYwJTJGMyUyRjMlMkZqJTJGcyUyRm4lMkYzJTJGZSUyRjAlMkY4JTJGNSUyRmElMkZkJTJGYyUyRjglMkZlJTJGZiUyRjElMkY="
    const key = decodeURIComponent(Buffer.from(_key, "base64").toString("ascii")).replace(/\//g, "")
    return {
        ["headers"]: {
            ["x-rapidapi-key"]: key,
        },
        ["params"]: {
            ["url"]: url,
            ["hd"]: 1,
        },
    }
}

async function tiktok(url) {
    try {
        const { data } = await axios.get("https://tiktok-video-no-watermark2.p.rapidapi.com" + "/", {
            ...RapidApiInit(url),
        }).catch((e) => e?.response)
        if (data && typeof data === "object") {
            if (data.code === 0) {
                return {
                    nickname: data?.data?.author?.nickname,
                    unique_id: data?.data?.author?.unique_id,
                    download_count: data?.data?.download_count,
                    duration: data?.data?.duration,
                    description: data?.data?.title,
                    play: data?.data?.play,
                    wmplay: data?.data?.wmplay,
                    hdplay: data?.data?.hdplay,
                    music: data?.data?.music,
                }
            }
            else {
                throw new Error(data.message ||
                    `Failed to get data from https://tiktok-video-no-watermark2.p.rapidapi.com`)
            }
        }
        else {
            throw new Error(data.message ||
                `Failed to get data from https://tiktok-video-no-watermark2.p.rapidapi.com`)
        }
    }
    catch (e) {
        return {
            error: true,
            message: String(e),
        }
    }
}

export { tiktok }
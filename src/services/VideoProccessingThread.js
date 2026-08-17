
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
const ffmpeg = new FFmpeg();











self.onmessage = async (event) => {
    const { file, startTime, endTime } = event.data;
    console.log(event)

    try {    // FFmpeg load
        if (!ffmpeg.loaded) {
            await ffmpeg.load();
        }

        // Browser File -> FFmpeg filesystem
        await ffmpeg.writeFile(
            "input.mp4",
            await fetchFile(file)
        );

        // Video process
        console.log('kaam ho rha hai ')
        await ffmpeg.exec([
            "-ss", String(startTime),
            "-i", "input.mp4",
            "-t", String(endTime - startTime),

            // 9:16 crop + resize
            "-vf",
            "crop=ih*9/16:ih,scale=720:1280",

            "-c:v", "libx264",
            "-preset", "veryfast",

            "-c:a", "aac",

            "output.mp4"
        ]);

        // Processed file read
        const data = await ffmpeg.readFile("output.mp4");

        console.log("Processing complete");

        self.postMessage({
            type: "complete",
            data
        });

    } catch (error) {

        console.error("Worker error:", error);

        self.postMessage({
            type: "error",
            error: error.message
        });

    }
    
};
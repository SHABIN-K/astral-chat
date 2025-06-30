from aiogram.types import Message, Video
from aiogram.methods import GetFile
from aiogram import Bot

from utils.logger import logger
from utils.file_utils import temporary_file
from uploader.twitter import mock_twitter_uploader

async def process_video(message: Message, bot: Bot):
    """
    Handles the entire video processing workflow.
    """
    if not message.video:
        logger.warning("Received a message without a video to process.")
        return

    video: Video = message.video
    logger.info(f"Received video. File ID: {video.file_id}, MIME type: {video.mime_type}, Duration: {video.duration}s")
    
    await message.reply("✅ Video received. Starting upload process...")

    try:
        file_info = await bot.get_file(video.file_id)
        file_path = file_info.file_path
        
        if not file_path:
            await message.reply("❌ Couldn't get file path from Telegram.")
            return

        with temporary_file(suffix=f"_{video.file_unique_id}.mp4") as temp_file_path:
            logger.info(f"Downloading video to temporary path: {temp_file_path}")
            await bot.download_file(file_path, destination=temp_file_path)
            logger.info("Download complete. Starting upload to Twitter (mock)...")

            # Upload the video
            upload_url = await mock_twitter_uploader.upload_video(
                file_path=temp_file_path,
                message_text=message.caption
            )

            # Reply to the user with the result
            await message.reply(
                f"🚀 Video successfully uploaded!\n\n"
                f"You can view it here: {upload_url}",
                disable_web_page_preview=True
            )

    except Exception as e:
        logger.error(f"An error occurred during video processing: {e}", exc_info=True)
        await message.reply("❌ An unexpected error occurred. Could not process your video.") 
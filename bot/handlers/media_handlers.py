from aiogram import Router, F, Bot
from aiogram.types import Message

from bot.services.uploader_service import process_video
from utils.logger import logger

router = Router()

@router.message(F.video)
async def video_handler(message: Message, bot: Bot):
    """
    Handles incoming video messages.
    """
    logger.info("Video handler triggered.")
    await process_video(message, bot)

@router.message(F.photo | F.document | F.audio)
async def unsupported_media_handler(message: Message):
    """
    Informs the user that other media types are not yet supported.
    """
    logger.info(f"Received unsupported media of type: {message.content_type}")
    await message.reply("Thanks! Currently, I only support video files. Support for other media is coming soon!") 
from aiogram import Router
from aiogram.filters import CommandStart
from aiogram.types import Message

router = Router()

@router.message(CommandStart())
async def command_start_handler(message: Message):
    """
    This handler receives messages with `/start` command
    """
    await message.answer(
        f"Hello, {message.from_user.full_name}!\n\n"
        f"I am DropCast, your personal media assistant. "
        f"Send me a video, and I'll upload it to social media for you.\n\n"
        f"Let's get started! Send me a video file."
    ) 
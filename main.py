import asyncio

from aiogram import Bot, Dispatcher
from aiogram.client.default import DefaultBotProperties
from aiogram.enums import ParseMode

from bot.config import BOT_TOKEN
from bot.handlers import command_handlers, media_handlers
from utils.logger import logger


async def main():
    """
    The main function that starts the bot.
    """
    bot = Bot(
        token=BOT_TOKEN,
        default=DefaultBotProperties(parse_mode=ParseMode.HTML)
    )
    dp = Dispatcher()

    logger.info("Setting up routers...")
    dp.include_router(command_handlers.router)
    dp.include_router(media_handlers.router)

    logger.info("Starting bot polling...")
    try:
        await dp.start_polling(bot, allowed_updates=dp.resolve_used_update_types())
    finally:
        await bot.session.close()


if __name__ == "__main__":
    logger.info("DropCast bot is starting...")
    try:
        asyncio.run(main())
    except (KeyboardInterrupt, SystemExit):
        logger.info("DropCast bot has been stopped.")
    except Exception as e:
        logger.error(f"An unexpected error occurred in main: {e}", exc_info=True) 
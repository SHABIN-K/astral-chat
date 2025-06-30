import asyncio
from pathlib import Path
from utils.logger import logger

class MockTwitterUploader:
    """
    A mock uploader that simulates uploading a video to Twitter.
    """
    async def upload_video(self, file_path: Path, message_text: str | None) -> str:
        """
        Simulates uploading a video.

        :param file_path: Path to the video file.
        :param message_text: The text to accompany the video.
        :return: A simulated URL to the uploaded content.
        """
        logger.info(f"Mock-uploading video '{file_path.name}' to Twitter...")
        logger.info(f"Accompanying text: '{message_text if message_text else 'No text'}'")
        
        # Simulate network latency
        await asyncio.sleep(3)
        
        # In a real scenario, this would be the URL returned by the Twitter API
        mock_url = f"https://twitter.com/user/status/{file_path.stem}"
        
        logger.info(f"Mock-upload successful. Video is available at: {mock_url}")
        
        return mock_url

# Single instance for the application
mock_twitter_uploader = MockTwitterUploader() 
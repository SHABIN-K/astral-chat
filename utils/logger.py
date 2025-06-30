import logging
import sys

def setup_logger():
    """
    Configures and returns a logger.
    """
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(levelname)s - %(name)s - %(message)s",
        stream=sys.stdout,
    )
    logger = logging.getLogger(__name__)
    return logger

logger = setup_logger() 
import tempfile
from pathlib import Path
import os
from contextlib import contextmanager

from utils.logger import logger

TEMP_DIR = Path(__file__).parent.parent / "temp"
TEMP_DIR.mkdir(exist_ok=True)

logger.info(f"Temporary file directory set to: {TEMP_DIR}")

@contextmanager
def temporary_file(suffix: str = ".tmp"):
    """
    A context manager to create a temporary file and ensure its deletion.
    Yields a Path object to the temporary file.
    """
    file_path = None
    try:
        fd, path_str = tempfile.mkstemp(suffix=suffix, dir=TEMP_DIR)
        os.close(fd)
        file_path = Path(path_str)
        logger.info(f"Created temporary file: {file_path}")
        yield file_path
    finally:
        if file_path and file_path.exists():
            try:
                file_path.unlink()
                logger.info(f"Successfully deleted temporary file: {file_path}")
            except OSError as e:
                logger.error(f"Error deleting temporary file {file_path}: {e}")

def get_temp_dir() -> Path:
    """Returns the path to the temporary directory."""
    return TEMP_DIR 
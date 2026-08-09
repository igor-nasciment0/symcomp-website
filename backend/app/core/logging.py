import logging
import sys


class CustomFormatter(logging.Formatter):
    """Log formatter with timestamp, caller and type of message, as well as ANSI colors"""

    RESET = "\033[0m"
    BOLD = "\033[1m"

    GREY = "\033[37m"
    BLUE = "\033[34m"
    YELLOW = "\033[33m"
    RED = "\033[31m"
    CRITICAL = "\033[1;41m"

    def get_color(self, level: int, default: str) -> str:
        return {
            logging.DEBUG: self.GREY,
            logging.INFO: self.BLUE,
            logging.WARNING: self.YELLOW,
            logging.ERROR: self.RED,
            logging.CRITICAL: self.CRITICAL,
        }.get(level, default)

    def format(self, record):
        color = self.get_color(record.levelno, self.GREY)

        log_fmt = f"{self.GREY}%(asctime)s [%(name)s:%(lineno)s]{self.RESET} {color}{self.BOLD}%(levelname)s{self.RESET}{color}: %(message)s{self.RESET}"
        formatter = logging.Formatter(log_fmt, datefmt="%Y-%m-%d %H:%M:%S")
        return formatter.format(record)


def configure() -> None:
    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(CustomFormatter())

    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)
    root_logger.handlers = [handler]

    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)

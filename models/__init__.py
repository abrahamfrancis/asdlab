from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base

from .config import SQLALCHEMY_DB_URI

db_engine = create_engine(SQLALCHEMY_DB_URI)

metadata = MetaData(schema="player_auction")

Base = declarative_base(metadata=metadata)

import models.tables  # noqa

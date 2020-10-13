from sqlalchemy import (
    Column,
    Integer,
    String,
    Enum,
    Float,
    Boolean,
    ForeignKey,
    TIMESTAMP,
)
from sqlalchemy.orm import relationship

from . import Base
from .player_role import PlayerRole


class Player(Base):
    __tablename__ = "player"
    id = Column(Integer, primary_key=True)
    firstname = Column(String(length=64), nullable=False)
    middlename = Column(String(length=64), nullable=True)
    lastname = Column(String(length=64), nullable=False)
    player_type = Column(Enum(PlayerRole))
    buyout = Column(Float())
    start_price = Column(Float())
    auctioned = Column(Boolean())
    contract_period = Column(Float())

    team_id = Column(Integer, ForeignKey("team.id"))


class Team(Base):
    __tablename__ = "team"
    id = Column(Integer, primary_key=True)
    teamname = Column(String(length=64), nullable=False)
    username = Column(String(length=64), nullable=False)
    password = Column(String(length=128), nullable=False)
    funds = Column(Float(), nullable=False)

    players = relationship("player", back_populates="child")


class Bids(Base):
    __tablename__ = "auction_bids"
    id = Column(Integer, primary_key=True)
    amount = Column(Float(), nullable=False)
    when = Column(TIMESTAMP())

    player_id = Column(Integer, ForeignKey("player.id"))
    team_id = Column(Integer, ForeignKey("team.id"))


class Admin(Base):
    __tablename__ = "admin"
    id = Column(Integer, primary_key=True)
    username = Column(String(length=64), nullable=False)
    password = Column(String(length=128), nullable=False)

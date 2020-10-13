create role web_anon nologin;

grant web_anon to postgres;

grant usage on schema player_auction to web_anon;
grant select on player_auction.admin to web_anon;
grant select on player_auction.player to web_anon;
grant select on player_auction.team to web_anon;
grant select on player_auction.auction_bids to web_anon;

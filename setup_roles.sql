create role web_anon nologin;

grant web_anon to postgres;

grant usage on schema player_auction to web_anon;
grant select on player_auction.admin to web_anon;
grant select on player_auction.player to web_anon;
grant select on player_auction.team to web_anon;
grant select on player_auction.auction_bids to web_anon;

grant insert on player_auction.admin to web_anon;
grant insert on player_auction.player to web_anon;
grant insert on player_auction.team to web_anon;
grant insert on player_auction.auction_bids to web_anon;

grant update on player_auction.admin to web_anon;
grant update on player_auction.player to web_anon;
grant update on player_auction.team to web_anon;
grant update on player_auction.auction_bids to web_anon;

grant delete on player_auction.admin to web_anon;
grant delete on player_auction.player to web_anon;
grant delete on player_auction.team to web_anon;
grant delete on player_auction.auction_bids to web_anon;

GRANT USAGE, SELECT ON SEQUENCE player_auction.admin_id_seq to web_anon;
GRANT USAGE, SELECT ON SEQUENCE player_auction.team_id_seq to web_anon;
GRANT USAGE, SELECT ON SEQUENCE player_auction.player_id_seq to web_anon;
GRANT USAGE, SELECT ON SEQUENCE player_auction.auction_bids_id_seq to web_anon;

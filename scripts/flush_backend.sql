set foreign_key_checks = 0;
truncate roster_player;
truncate roster;
truncate team;
update wristband set active=0 where active=1;
truncate player;
truncate package;

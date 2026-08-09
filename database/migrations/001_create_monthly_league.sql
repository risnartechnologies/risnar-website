-- ============================================================
-- MONTHLY LEAGUE
-- ============================================================

CREATE TABLE IF NOT EXISTS monthly_league (

    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,

    player_id VARCHAR(128) NOT NULL,

    player_name VARCHAR(100) NOT NULL,

    player_avatar TEXT NULL,

    coins BIGINT NOT NULL DEFAULT 0,

    rank_position INT NOT NULL DEFAULT 0,

    month TINYINT NOT NULL,

    year SMALLINT NOT NULL,

    country VARCHAR(8) NULL,

    last_coin_at TIMESTAMP NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uq_player_month (
        player_id,
        month,
        year
    ),

    INDEX idx_rank (
        month,
        year,
        coins DESC
    ),

    INDEX idx_player (
        player_id
    )

) ENGINE=InnoDB
DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci;
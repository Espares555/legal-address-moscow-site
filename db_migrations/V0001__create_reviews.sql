CREATE TABLE t_p98561575_legal_address_moscow.reviews (
    id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    company VARCHAR(200) NOT NULL DEFAULT '',
    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    text TEXT NOT NULL,
    service VARCHAR(120) NOT NULL DEFAULT '',
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    moderated_at TIMESTAMP NULL
);
CREATE INDEX idx_reviews_status_created ON t_p98561575_legal_address_moscow.reviews (status, created_at DESC);
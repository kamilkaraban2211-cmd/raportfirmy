-- Schemat bazy MVP. Uruchamia właściciel bazy (nie użytkownik aplikacji):
--   psql "$DATABASE_URL_OWNER" -v ON_ERROR_STOP=1 -v app_role=rf_app -f serwer/schema.sql
-- Aplikacja łączy się jako app_role: nie jest właścicielem tabel, więc obowiązuje ją RLS.

CREATE FUNCTION app_rola() RETURNS text LANGUAGE sql STABLE
  AS $$ SELECT coalesce(current_setting('app.rola', true), '') $$;
CREATE FUNCTION app_token() RETURNS bytea LANGUAGE sql STABLE
  AS $$ SELECT decode(nullif(current_setting('app.token', true), ''), 'hex') $$;

CREATE TABLE zlecenie (
  id           bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  token_hash   bytea NOT NULL UNIQUE,            -- SHA-256 linku klienta; samego linku nie zapisujemy
  sklep        text NOT NULL CHECK (length(sklep) BETWEEN 3 AND 120),
  miejscowosc  text NOT NULL CHECK (length(miejscowosc) BETWEEN 2 AND 80),
  imie         text NOT NULL CHECK (length(imie) BETWEEN 1 AND 60),
  telefon      text NOT NULL CHECK (telefon ~ '^[0-9]{9}$'),
  nip_szyfr    bytea NOT NULL,                   -- AES-256-GCM, klucz tylko w zmiennej środowiskowej serwera
  opis         text NOT NULL DEFAULT '' CHECK (length(opis) <= 1000),
  zgoda_tresc  text NOT NULL,
  zgoda_data   timestamptz NOT NULL DEFAULT now(),
  stan         text NOT NULL DEFAULT 'znalezlismy'
               CHECK (stan IN ('znalezlismy', 'robimy', 'gotowe', 'nie_udalo_sie')),
  utworzono    timestamptz NOT NULL DEFAULT now(),
  zmieniono    timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE historia_stanu (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  zlecenie_id bigint NOT NULL REFERENCES zlecenie(id),
  stan        text NOT NULL,
  kiedy       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE opiekun (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  login       text NOT NULL UNIQUE,
  haslo_hash  text NOT NULL,                     -- scrypt
  totp_sekret bytea NOT NULL,                    -- drugi składnik (aplikacja z kodami)
  totp_krok   bigint NOT NULL DEFAULT 0,         -- ostatni użyty kod: blokuje ponowne użycie
  aktywny     boolean NOT NULL DEFAULT true
);

CREATE TABLE sesja (
  token_hash  bytea PRIMARY KEY,
  opiekun_id  bigint NOT NULL REFERENCES opiekun(id),
  wygasa      timestamptz NOT NULL
);

-- Dziennik dostępu: kto, kiedy, co. Bez treści danych. Aplikacja może tylko dopisywać.
CREATE TABLE dziennik (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  kiedy       timestamptz NOT NULL DEFAULT now(),
  kto         text NOT NULL,
  akcja       text NOT NULL,
  zlecenie_id bigint
);

ALTER TABLE zlecenie       ENABLE ROW LEVEL SECURITY;
ALTER TABLE historia_stanu ENABLE ROW LEVEL SECURITY;
ALTER TABLE opiekun        ENABLE ROW LEVEL SECURITY;
ALTER TABLE sesja          ENABLE ROW LEVEL SECURITY;
ALTER TABLE dziennik       ENABLE ROW LEVEL SECURITY;

-- Klient widzi wyłącznie swoje zlecenie (po skrócie linku); opiekun widzi wszystkie.
CREATE POLICY zl_odczyt ON zlecenie FOR SELECT
  USING (app_rola() = 'opiekun' OR token_hash = app_token());
CREATE POLICY zl_nowe ON zlecenie FOR INSERT
  WITH CHECK (app_rola() = 'anon' AND stan = 'znalezlismy' AND token_hash = app_token());
CREATE POLICY zl_zmiana ON zlecenie FOR UPDATE
  USING (app_rola() = 'opiekun') WITH CHECK (app_rola() = 'opiekun');

CREATE POLICY hs_odczyt ON historia_stanu FOR SELECT
  USING (zlecenie_id IN (SELECT id FROM zlecenie));
CREATE POLICY hs_nowe ON historia_stanu FOR INSERT
  WITH CHECK (app_rola() IN ('anon', 'opiekun') AND zlecenie_id IN (SELECT id FROM zlecenie));

CREATE POLICY op_odczyt ON opiekun FOR SELECT USING (app_rola() = 'logowanie');
CREATE POLICY op_krok   ON opiekun FOR UPDATE USING (app_rola() = 'logowanie');

CREATE POLICY se_odczyt ON sesja FOR SELECT USING (app_rola() = 'sesja' AND token_hash = app_token());
CREATE POLICY se_nowa   ON sesja FOR INSERT WITH CHECK (app_rola() = 'logowanie');
CREATE POLICY se_koniec ON sesja FOR DELETE USING (app_rola() = 'sesja' AND token_hash = app_token());

CREATE POLICY dz_wpis   ON dziennik FOR INSERT WITH CHECK (app_rola() <> '');
CREATE POLICY dz_odczyt ON dziennik FOR SELECT USING (app_rola() = 'opiekun');

-- Najmniejsze potrzebne uprawnienia. Brak DELETE na zleceniach i dzienniku, brak UPDATE dziennika.
GRANT USAGE ON SCHEMA public TO :"app_role";
GRANT SELECT, INSERT ON zlecenie TO :"app_role";
GRANT UPDATE (stan, zmieniono) ON zlecenie TO :"app_role";
GRANT SELECT, INSERT ON historia_stanu TO :"app_role";
GRANT SELECT ON opiekun TO :"app_role";
GRANT UPDATE (totp_krok) ON opiekun TO :"app_role";
GRANT SELECT, INSERT, DELETE ON sesja TO :"app_role";
GRANT SELECT, INSERT ON dziennik TO :"app_role";

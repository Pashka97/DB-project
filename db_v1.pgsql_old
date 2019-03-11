--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: agerating; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.agerating (
    id integer NOT NULL,
    rating character varying(5) NOT NULL
);


ALTER TABLE public.agerating OWNER TO me;

--
-- Name: genre; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.genre (
    id integer NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE public.genre OWNER TO me;

--
-- Name: movie; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.movie (
    id integer NOT NULL,
    title character varying(50) NOT NULL,
    year integer NOT NULL,
    genreid integer NOT NULL,
    ageratingid integer NOT NULL,
    overallrating integer NOT NULL
);


ALTER TABLE public.movie OWNER TO me;

--
-- Name: movietag; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.movietag (
    movieid integer NOT NULL,
    tagid integer NOT NULL
);


ALTER TABLE public.movietag OWNER TO me;

--
-- Name: review; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.review (
    id integer NOT NULL,
    movieid integer NOT NULL,
    userid integer NOT NULL,
    scoreid integer NOT NULL,
    comment character varying(500),
    ratingid integer NOT NULL
);


ALTER TABLE public.review OWNER TO me;

--
-- Name: score; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.score (
    id integer NOT NULL,
    name character varying(20)
);


ALTER TABLE public.score OWNER TO me;

--
-- Name: tag; Type: TABLE; Schema: public; Owner: me
--

CREATE TABLE public.tag (
    id integer NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE public.tag OWNER TO me;

--
-- Name: useraccount; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.useraccount (
    id integer NOT NULL,
    firstname character varying(30) NOT NULL,
    lastname character varying(30) NOT NULL,
    email character varying(50) NOT NULL,
    username character varying(20) NOT NULL,
    password character varying(30) NOT NULL,
    reputation real DEFAULT 0.5
);


ALTER TABLE public.useraccount OWNER TO postgres;

--
-- Name: useraccount_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.useraccount_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.useraccount_id_seq OWNER TO postgres;

--
-- Name: useraccount_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.useraccount_id_seq OWNED BY public.useraccount.id;


--
-- Name: useraccount id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.useraccount ALTER COLUMN id SET DEFAULT nextval('public.useraccount_id_seq'::regclass);


--
-- Data for Name: agerating; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.agerating (id, rating) FROM stdin;
\.


--
-- Data for Name: genre; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.genre (id, name) FROM stdin;
\.


--
-- Data for Name: movie; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.movie (id, title, year, genreid, ageratingid, overallrating) FROM stdin;
\.


--
-- Data for Name: movietag; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.movietag (movieid, tagid) FROM stdin;
\.


--
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.review (id, movieid, userid, scoreid, comment, ratingid) FROM stdin;
\.


--
-- Data for Name: score; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.score (id, name) FROM stdin;
\.


--
-- Data for Name: tag; Type: TABLE DATA; Schema: public; Owner: me
--

COPY public.tag (id, name) FROM stdin;
\.


--
-- Data for Name: useraccount; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.useraccount (id, firstname, lastname, email, username, password, reputation) FROM stdin;
1	sean	coulter	myemail@example.com	aaa	mypassword	0.5
3	xinyu	lastname	heremail@example.com	ggg	herpassword	0.5
2	pavel	lastname	hisemail@example.com	rrr	hispassword	0.5
\.


--
-- Name: useraccount_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.useraccount_id_seq', 3, true);


--
-- Name: agerating agerating_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.agerating
    ADD CONSTRAINT agerating_pkey PRIMARY KEY (id);


--
-- Name: genre genre_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.genre
    ADD CONSTRAINT genre_pkey PRIMARY KEY (id);


--
-- Name: movie movie_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT movie_pkey PRIMARY KEY (id);


--
-- Name: movietag movietag_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.movietag
    ADD CONSTRAINT movietag_pkey PRIMARY KEY (movieid);


--
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);


--
-- Name: score score_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.score
    ADD CONSTRAINT score_pkey PRIMARY KEY (id);


--
-- Name: tag tag_pkey; Type: CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.tag
    ADD CONSTRAINT tag_pkey PRIMARY KEY (id);


--
-- Name: useraccount useraccount_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.useraccount
    ADD CONSTRAINT useraccount_email_key UNIQUE (email);


--
-- Name: useraccount useraccount_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.useraccount
    ADD CONSTRAINT useraccount_pkey PRIMARY KEY (id);


--
-- Name: useraccount useraccount_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.useraccount
    ADD CONSTRAINT useraccount_username_key UNIQUE (username);


--
-- Name: movie movie_genreid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.movie
    ADD CONSTRAINT movie_genreid_fkey FOREIGN KEY (genreid) REFERENCES public.genre(id);


--
-- Name: movietag movietag_movieid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.movietag
    ADD CONSTRAINT movietag_movieid_fkey FOREIGN KEY (movieid) REFERENCES public.movie(id);


--
-- Name: movietag movietag_tagid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.movietag
    ADD CONSTRAINT movietag_tagid_fkey FOREIGN KEY (tagid) REFERENCES public.tag(id);


--
-- Name: review review_movieid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_movieid_fkey FOREIGN KEY (movieid) REFERENCES public.movie(id);


--
-- Name: review review_scoreid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_scoreid_fkey FOREIGN KEY (scoreid) REFERENCES public.score(id);


--
-- Name: review review_userid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: me
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_userid_fkey FOREIGN KEY (userid) REFERENCES public.useraccount(id);


--
-- Name: TABLE useraccount; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.useraccount TO me;


--
-- PostgreSQL database dump complete
--


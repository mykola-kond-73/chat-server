--
-- PostgreSQL database dump
--

-- Dumped from database version 14.1
-- Dumped by pg_dump version 14.1

-- Started on 2023-06-18 19:04:58

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 16572)
-- Name: messages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.messages (
    id character varying(255) NOT NULL,
    "authorId" character varying(255) NOT NULL,
    message character varying(255) NOT NULL,
    "createdDate" timestamp with time zone NOT NULL,
    "isUpdate" boolean DEFAULT false,
    "roomId" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.messages OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 16565)
-- Name: rooms; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rooms (
    id character varying(255) NOT NULL,
    "clientId_1" character varying(255) NOT NULL,
    "clientId_2" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.rooms OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 26036)
-- Name: tokens; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens (
    id character varying(255) NOT NULL,
    "userId" character varying(255) NOT NULL,
    "refreshToken" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.tokens OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16556)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 3328 (class 0 OID 16572)
-- Dependencies: 211
-- Data for Name: messages; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.messages (id, "authorId", message, "createdDate", "isUpdate", "roomId", "createdAt", "updatedAt") FROM stdin;
0e2ba215-cf92-4633-802e-199e8500e509	14a74339-7b06-4421-8523-f128423bd72c	Hello test1!	2023-06-18 15:57:09.119+00	f	d2397461-ee1a-4975-9b2c-b6c39dc52a6a	2023-06-18 15:57:09.138+00	2023-06-18 15:57:09.138+00
a2671729-a235-477c-8d4e-352cf69cf4e8	0bdae0a1-e959-4962-bcc4-bc07cbc9de1c	Hi test2!	2023-06-18 15:57:42.154+00	f	d2397461-ee1a-4975-9b2c-b6c39dc52a6a	2023-06-18 15:57:42.166+00	2023-06-18 15:57:42.166+00
\.


--
-- TOC entry 3327 (class 0 OID 16565)
-- Dependencies: 210
-- Data for Name: rooms; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rooms (id, "clientId_1", "clientId_2", "createdAt", "updatedAt") FROM stdin;
d2397461-ee1a-4975-9b2c-b6c39dc52a6a	14a74339-7b06-4421-8523-f128423bd72c	0bdae0a1-e959-4962-bcc4-bc07cbc9de1c	2023-06-18 15:56:50.903+00	2023-06-18 15:56:50.903+00
\.


--
-- TOC entry 3329 (class 0 OID 26036)
-- Dependencies: 212
-- Data for Name: tokens; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens (id, "userId", "refreshToken", "createdAt", "updatedAt") FROM stdin;
\.


--
-- TOC entry 3326 (class 0 OID 16556)
-- Dependencies: 209
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, name, "createdAt", "updatedAt") FROM stdin;
0bdae0a1-e959-4962-bcc4-bc07cbc9de1c	test1@email.com	$2a$10$tc3xubJ9zT2gXzME9EF0pOqm4PhqGco8lkIYix6rNusEkfMK.hqy.	test1	2023-06-18 15:55:58.063+00	2023-06-18 15:55:58.063+00
14a74339-7b06-4421-8523-f128423bd72c	test2@email.com	$2a$10$xFVLyYyV1lV2a0WsbuwIb.AkSSUB9BMTSsB0ihXvI0HA2F/kNFRcm	test2	2023-06-18 15:56:35.346+00	2023-06-18 15:56:35.346+00
\.


--
-- TOC entry 3183 (class 2606 OID 16579)
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id);


--
-- TOC entry 3181 (class 2606 OID 16571)
-- Name: rooms rooms_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rooms
    ADD CONSTRAINT rooms_pkey PRIMARY KEY (id);


--
-- TOC entry 3185 (class 2606 OID 26042)
-- Name: tokens tokens_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens
    ADD CONSTRAINT tokens_pkey PRIMARY KEY (id);


--
-- TOC entry 3177 (class 2606 OID 16564)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3179 (class 2606 OID 16562)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3186 (class 2606 OID 16580)
-- Name: messages messages_roomId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.messages
    ADD CONSTRAINT "messages_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES public.rooms(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2023-06-18 19:04:59

--
-- PostgreSQL database dump complete
--


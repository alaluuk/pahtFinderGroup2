--
-- PostgreSQL database dump
--

-- Dumped from database version 11.5 (Ubuntu 11.5-3.pgdg16.04+1)
-- Dumped by pg_dump version 12.0

-- Started on 2019-12-16 13:52:46 UTC

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

--
-- TOC entry 2 (class 3079 OID 47722650)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 3900 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 212 (class 1255 OID 47742205)
-- Name: trigger_update_set_timestamp(); Type: FUNCTION; Schema: public; Owner: zbxafoncbcpmyz
--

CREATE FUNCTION public.trigger_update_set_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.trigger_update_set_timestamp() OWNER TO zbxafoncbcpmyz;

SET default_tablespace = '';

--
-- TOC entry 201 (class 1259 OID 49579214)
-- Name: house_structures; Type: TABLE; Schema: public; Owner: zbxafoncbcpmyz
--

CREATE TABLE public.house_structures (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    house_id uuid NOT NULL,
    type_id uuid NOT NULL,
    title character varying(255),
    u_value double precision,
    price double precision,
    manufacturer character varying(255),
    serial_number character varying(255),
    production_year integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.house_structures OWNER TO zbxafoncbcpmyz;

--
-- TOC entry 200 (class 1259 OID 48962705)
-- Name: houses; Type: TABLE; Schema: public; Owner: zbxafoncbcpmyz
--

CREATE TABLE public.houses (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255),
    owner_id uuid NOT NULL,
    address_country character varying(2),
    address_city character varying(255),
    address_street character varying(255),
    address_lat double precision,
    address_lng double precision,
    construction_year integer,
    heating_system character varying(255),
    cost_of_heating double precision,
    warm_water_pipe boolean,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.houses OWNER TO zbxafoncbcpmyz;

--
-- TOC entry 199 (class 1259 OID 48954969)
-- Name: structure_templates; Type: TABLE; Schema: public; Owner: zbxafoncbcpmyz
--

CREATE TABLE public.structure_templates (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    type_id uuid NOT NULL,
    title character varying(255),
    u_value double precision,
    price double precision,
    manufacturer character varying(255),
    serial_number character varying(255),
    production_year integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.structure_templates OWNER TO zbxafoncbcpmyz;

--
-- TOC entry 198 (class 1259 OID 47723083)
-- Name: structure_types; Type: TABLE; Schema: public; Owner: zbxafoncbcpmyz
--

CREATE TABLE public.structure_types (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.structure_types OWNER TO zbxafoncbcpmyz;

--
-- TOC entry 197 (class 1259 OID 47722797)
-- Name: users; Type: TABLE; Schema: public; Owner: zbxafoncbcpmyz
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(60) NOT NULL,
    role character varying(25) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO zbxafoncbcpmyz;

--
-- TOC entry 3890 (class 0 OID 48954969)
-- Dependencies: 199
-- Data for Name: structure_templates; Type: TABLE DATA; Schema: public; Owner: zbxafoncbcpmyz
--

COPY public.structure_templates (id, type_id, title, u_value, price, manufacturer, serial_number, production_year, created_at, updated_at) FROM stdin;
fe7f21bc-1c1d-4ec7-adfd-93851c945b9b	7c96b8fb-55ef-439b-be3a-0a950efc0298	Solartherm Reversible Window	1.19999999999999996	120	Sidey Solutions Ltd	KM 568661	2015	2019-11-19 12:50:16.719345	2019-11-28 11:32:51.21603
59d0bf50-ffc6-4977-8b2f-cdfc0c12477b	7c96b8fb-55ef-439b-be3a-0a950efc0298	Inliten 0.8 model (70)	1.39999999999999991	134.990000000000009	Camden Group	KM 567422	2013	2019-11-19 14:07:52.770106	2019-11-28 11:32:51.21603
3cfce735-cb67-4bc8-aebe-ae5bcecc786e	8fa8d247-726f-435c-a10b-2ed16b23bc34	Demo Roof Construction	1	1500	Heritage Roofs Ltd	123456	2015	2019-12-03 13:09:42.573056	2019-12-03 13:09:42.573056
849f0f17-b80a-4e62-9308-c667be17d67b	7ed1f8cb-660a-4e39-974c-a26bc24e117b	Unglazed Pedestrian Door	0.800000000000000044	149.990000000000009	Permadoor	M713	2012	2019-12-04 13:58:25.835392	2019-12-04 13:58:25.835392
23dc7a98-bfd5-4a93-a955-bd086e05212f	7ed1f8cb-660a-4e39-974c-a26bc24e117b	Insulated Steel Wood Edge Door	0.900000000000000022	250	World's Best Door Co.	CPD00X	2009	2019-12-04 14:01:21.074885	2019-12-08 15:44:55.000163
2ebe156e-7218-42f1-8826-a5edec90bd79	7c96b8fb-55ef-439b-be3a-0a950efc0298	SolarthermPlus Reversible Window	0.699999999999999956	575.5	Sidey Solutions Ltd	KM 568662	2015	2019-11-19 12:51:20.55207	2019-12-11 12:26:13.094771
74f16286-ca6b-4102-becf-e689e76320f4	8fa8d247-726f-435c-a10b-2ed16b23bc34	DEF	1.19999999999999996	1000	Test	\N	\N	2019-12-05 13:22:20.226429	2019-12-11 13:31:29.567119
59a21b73-8a2d-4dc7-968a-40bc5596745c	7ed1f8cb-660a-4e39-974c-a26bc24e117b	Partially-Glazed Door Style V	1.30000000000000004	100	Door-Stop International Ltd	SC016	2016	2019-12-04 13:59:47.823553	2019-12-12 11:43:49.80484
af1e1b2b-d542-4b59-94e1-b31dfe7b7527	7c96b8fb-55ef-439b-be3a-0a950efc0298	Kommerling O70 PVC-U Casement	1	150	Heritage Glass Ltd	KM 123456	\N	2019-11-19 14:09:19.198366	2019-12-13 12:04:44.880753
f9870516-53b8-464f-915b-89481cd4bb3c	8fa8d247-726f-435c-a10b-2ed16b23bc34	ABC	1.10000000000000009	1000	\N	\N	\N	2019-12-05 11:56:55.932994	2019-12-16 13:23:46.922115
73b1d26a-8318-4739-8232-861974709a9e	8fa8d247-726f-435c-a10b-2ed16b23bc34	GHJ	1.10000000000000009	800	\N	\N	\N	2019-12-10 11:15:53.416892	2019-12-16 13:23:53.867857
\.


--
-- TOC entry 3889 (class 0 OID 47723083)
-- Dependencies: 198
-- Data for Name: structure_types; Type: TABLE DATA; Schema: public; Owner: zbxafoncbcpmyz
--

COPY public.structure_types (id, title, created_at, updated_at) FROM stdin;
8fa8d247-726f-435c-a10b-2ed16b23bc34	Roof construction	2019-11-07 11:25:59.796172	2019-11-07 11:25:59.796172
7c96b8fb-55ef-439b-be3a-0a950efc0298	Windows	2019-11-07 11:25:59.796172	2019-11-07 11:25:59.796172
7ed1f8cb-660a-4e39-974c-a26bc24e117b	Doors	2019-12-04 13:49:47.634289	2019-12-05 11:24:28.257369
ebf98780-1909-4189-a803-c294883f40fd	Ground floor	2019-12-05 11:26:46.920297	2019-12-05 11:26:46.920297
\.


--
-- TOC entry 3888 (class 0 OID 47722797)
-- Dependencies: 197
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: zbxafoncbcpmyz
--

COPY public.users (id, name, email, password_hash, role, created_at, updated_at) FROM stdin;
b13f1f1f-bb9e-45bb-90d8-e74d94c493fc	Demo Admin	admin@pathfinder-demo.com	sha1$8ea5a32d$1$fa61eeb1118e6da333a39cdb008cc371bbd4e70f	admin	2019-11-06 11:00:00	2019-12-16 13:39:45.387988
\.


--
-- TOC entry 3757 (class 2606 OID 49579224)
-- Name: house_structures house_structures_pkey; Type: CONSTRAINT; Schema: public; Owner: zbxafoncbcpmyz
--

ALTER TABLE ONLY public.house_structures
    ADD CONSTRAINT house_structures_pkey PRIMARY KEY (id);


--
-- TOC entry 3755 (class 2606 OID 48962715)
-- Name: houses houses_pkey; Type: CONSTRAINT; Schema: public; Owner: zbxafoncbcpmyz
--

ALTER TABLE ONLY public.houses
    ADD CONSTRAINT houses_pkey PRIMARY KEY (id);


--
-- TOC entry 3753 (class 2606 OID 48954979)
-- Name: structure_templates structure_templates_pkey; Type: CONSTRAINT; Schema: public; Owner: zbxafoncbcpmyz
--

ALTER TABLE ONLY public.structure_templates
    ADD CONSTRAINT structure_templates_pkey PRIMARY KEY (id);


--
-- TOC entry 3751 (class 2606 OID 47723088)
-- Name: structure_types structure_types__pkey; Type: CONSTRAINT; Schema: public; Owner: zbxafoncbcpmyz
--

ALTER TABLE ONLY public.structure_types
    ADD CONSTRAINT structure_types__pkey PRIMARY KEY (id);


--
-- TOC entry 3747 (class 2606 OID 47744525)
-- Name: users uq_user_email; Type: CONSTRAINT; Schema: public; Owner: zbxafoncbcpmyz
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT uq_user_email UNIQUE (email);


--
-- TOC entry 3749 (class 2606 OID 47722805)
-- Name: users users__pkey; Type: CONSTRAINT; Schema: public; Owner: zbxafoncbcpmyz
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users__pkey PRIMARY KEY (id);


--
-- TOC entry 3766 (class 2620 OID 49579230)
-- Name: house_structures house_structures_update_trigger; Type: TRIGGER; Schema: public; Owner: zbxafoncbcpmyz
--

CREATE TRIGGER house_structures_update_trigger BEFORE UPDATE ON public.house_structures FOR EACH ROW EXECUTE PROCEDURE public.trigger_update_set_timestamp();


--
-- TOC entry 3765 (class 2620 OID 48962721)
-- Name: houses houses_update_trigger; Type: TRIGGER; Schema: public; Owner: zbxafoncbcpmyz
--

CREATE TRIGGER houses_update_trigger BEFORE UPDATE ON public.houses FOR EACH ROW EXECUTE PROCEDURE public.trigger_update_set_timestamp();


--
-- TOC entry 3763 (class 2620 OID 47742353)
-- Name: structure_types structure_types_update_trigger; Type: TRIGGER; Schema: public; Owner: zbxafoncbcpmyz
--

CREATE TRIGGER structure_types_update_trigger BEFORE UPDATE ON public.structure_types FOR EACH ROW EXECUTE PROCEDURE public.trigger_update_set_timestamp();


--
-- TOC entry 3764 (class 2620 OID 48954985)
-- Name: structure_templates structures_update_trigger; Type: TRIGGER; Schema: public; Owner: zbxafoncbcpmyz
--

CREATE TRIGGER structures_update_trigger BEFORE UPDATE ON public.structure_templates FOR EACH ROW EXECUTE PROCEDURE public.trigger_update_set_timestamp();


--
-- TOC entry 3762 (class 2620 OID 47742226)
-- Name: users users_update_trigger; Type: TRIGGER; Schema: public; Owner: zbxafoncbcpmyz
--

CREATE TRIGGER users_update_trigger BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE PROCEDURE public.trigger_update_set_timestamp();


--
-- TOC entry 3759 (class 2606 OID 48962716)
-- Name: houses fk_house_owner; Type: FK CONSTRAINT; Schema: public; Owner: zbxafoncbcpmyz
--

ALTER TABLE ONLY public.houses
    ADD CONSTRAINT fk_house_owner FOREIGN KEY (owner_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3760 (class 2606 OID 49579225)
-- Name: house_structures fk_house_structure_house; Type: FK CONSTRAINT; Schema: public; Owner: zbxafoncbcpmyz
--

ALTER TABLE ONLY public.house_structures
    ADD CONSTRAINT fk_house_structure_house FOREIGN KEY (house_id) REFERENCES public.houses(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3761 (class 2606 OID 49579278)
-- Name: house_structures fk_house_structure_type; Type: FK CONSTRAINT; Schema: public; Owner: zbxafoncbcpmyz
--

ALTER TABLE ONLY public.house_structures
    ADD CONSTRAINT fk_house_structure_type FOREIGN KEY (type_id) REFERENCES public.structure_types(id) ON UPDATE CASCADE ON DELETE CASCADE NOT VALID;


--
-- TOC entry 3758 (class 2606 OID 48954980)
-- Name: structure_templates fk_structure_type; Type: FK CONSTRAINT; Schema: public; Owner: zbxafoncbcpmyz
--

ALTER TABLE ONLY public.structure_templates
    ADD CONSTRAINT fk_structure_type FOREIGN KEY (type_id) REFERENCES public.structure_types(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3898 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: zbxafoncbcpmyz
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO zbxafoncbcpmyz;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 3899 (class 0 OID 0)
-- Dependencies: 624
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO zbxafoncbcpmyz;


-- Completed on 2019-12-16 13:52:54 UTC

--
-- PostgreSQL database dump complete
--
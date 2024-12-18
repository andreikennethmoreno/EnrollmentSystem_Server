PGDMP     	    -            
    |            EnrollmentSystem_Database    15.4    15.4 )    !           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            "           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            #           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            $           1262    16635    EnrollmentSystem_Database    DATABASE     �   CREATE DATABASE "EnrollmentSystem_Database" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Philippines.1252';
 +   DROP DATABASE "EnrollmentSystem_Database";
                postgres    false            �            1255    16784    generate_email()    FUNCTION       CREATE FUNCTION public.generate_email() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
    generated_email VARCHAR;
    duplicate_count INT := 0;
BEGIN
    -- Generate the initial email format
    generated_email := LOWER(NEW.first_name || '.' || NEW.last_name || '@cvsu.ph.com');
    
    -- Check if the email already exists and increment a counter if it does
    WHILE EXISTS (SELECT 1 FROM students WHERE email = generated_email) LOOP
        duplicate_count := duplicate_count + 1;
        generated_email := LOWER(NEW.first_name || '.' || NEW.last_name || duplicate_count || '@cvsu.ph.com');
    END LOOP;
    
    -- Assign the generated email to the NEW record
    NEW.email := generated_email;

    -- Return the modified NEW record
    RETURN NEW;
END;
$$;
 '   DROP FUNCTION public.generate_email();
       public          postgres    false            �            1259    16787    department_heads    TABLE     :  CREATE TABLE public.department_heads (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    middle_name character varying(255),
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    program_id integer
);
 $   DROP TABLE public.department_heads;
       public         heap    postgres    false            �            1259    16786    department_heads_head_id_seq    SEQUENCE     �   CREATE SEQUENCE public.department_heads_head_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.department_heads_head_id_seq;
       public          postgres    false    217            %           0    0    department_heads_head_id_seq    SEQUENCE OWNED BY     X   ALTER SEQUENCE public.department_heads_head_id_seq OWNED BY public.department_heads.id;
          public          postgres    false    216            �            1259    16821    programs    TABLE     l   CREATE TABLE public.programs (
    id integer NOT NULL,
    program_name character varying(255) NOT NULL
);
    DROP TABLE public.programs;
       public         heap    postgres    false            �            1259    16820    programs_id_seq    SEQUENCE     �   CREATE SEQUENCE public.programs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.programs_id_seq;
       public          postgres    false    221            &           0    0    programs_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.programs_id_seq OWNED BY public.programs.id;
          public          postgres    false    220            �            1259    16797    registrar_heads    TABLE     !  CREATE TABLE public.registrar_heads (
    id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    middle_name character varying(255),
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL
);
 #   DROP TABLE public.registrar_heads;
       public         heap    postgres    false            �            1259    16796    registrar_heads_head_id_seq    SEQUENCE     �   CREATE SEQUENCE public.registrar_heads_head_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.registrar_heads_head_id_seq;
       public          postgres    false    219            '           0    0    registrar_heads_head_id_seq    SEQUENCE OWNED BY     V   ALTER SEQUENCE public.registrar_heads_head_id_seq OWNED BY public.registrar_heads.id;
          public          postgres    false    218            �            1259    16776    students    TABLE     �  CREATE TABLE public.students (
    id integer NOT NULL,
    first_name character varying NOT NULL,
    middle_name character varying,
    last_name character varying NOT NULL,
    email character varying NOT NULL,
    contact_number character varying,
    address character varying,
    date_of_birth date NOT NULL,
    student_type character varying NOT NULL,
    standing_year integer NOT NULL,
    semester character varying,
    password character varying NOT NULL,
    program_id integer
);
    DROP TABLE public.students;
       public         heap    postgres    false            �            1259    16775    students_student_id_seq    SEQUENCE     �   CREATE SEQUENCE public.students_student_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.students_student_id_seq;
       public          postgres    false    215            (           0    0    students_student_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.students_student_id_seq OWNED BY public.students.id;
          public          postgres    false    214            v           2604    16790    department_heads id    DEFAULT        ALTER TABLE ONLY public.department_heads ALTER COLUMN id SET DEFAULT nextval('public.department_heads_head_id_seq'::regclass);
 B   ALTER TABLE public.department_heads ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    217    217            x           2604    16824    programs id    DEFAULT     j   ALTER TABLE ONLY public.programs ALTER COLUMN id SET DEFAULT nextval('public.programs_id_seq'::regclass);
 :   ALTER TABLE public.programs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            w           2604    16800    registrar_heads id    DEFAULT     }   ALTER TABLE ONLY public.registrar_heads ALTER COLUMN id SET DEFAULT nextval('public.registrar_heads_head_id_seq'::regclass);
 A   ALTER TABLE public.registrar_heads ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            u           2604    16779    students id    DEFAULT     r   ALTER TABLE ONLY public.students ALTER COLUMN id SET DEFAULT nextval('public.students_student_id_seq'::regclass);
 :   ALTER TABLE public.students ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215                      0    16787    department_heads 
   TABLE DATA           o   COPY public.department_heads (id, first_name, middle_name, last_name, email, password, program_id) FROM stdin;
    public          postgres    false    217   �5                 0    16821    programs 
   TABLE DATA           4   COPY public.programs (id, program_name) FROM stdin;
    public          postgres    false    221   6                 0    16797    registrar_heads 
   TABLE DATA           b   COPY public.registrar_heads (id, first_name, middle_name, last_name, email, password) FROM stdin;
    public          postgres    false    219   L6                 0    16776    students 
   TABLE DATA           �   COPY public.students (id, first_name, middle_name, last_name, email, contact_number, address, date_of_birth, student_type, standing_year, semester, password, program_id) FROM stdin;
    public          postgres    false    215   �6       )           0    0    department_heads_head_id_seq    SEQUENCE SET     K   SELECT pg_catalog.setval('public.department_heads_head_id_seq', 31, true);
          public          postgres    false    216            *           0    0    programs_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.programs_id_seq', 2, true);
          public          postgres    false    220            +           0    0    registrar_heads_head_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.registrar_heads_head_id_seq', 3, true);
          public          postgres    false    218            ,           0    0    students_student_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.students_student_id_seq', 152, true);
          public          postgres    false    214            |           2606    16794 &   department_heads department_heads_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.department_heads
    ADD CONSTRAINT department_heads_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.department_heads DROP CONSTRAINT department_heads_pkey;
       public            postgres    false    217            �           2606    16826    programs programs_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.programs
    ADD CONSTRAINT programs_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.programs DROP CONSTRAINT programs_pkey;
       public            postgres    false    221            ~           2606    16804 $   registrar_heads registrar_heads_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.registrar_heads
    ADD CONSTRAINT registrar_heads_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.registrar_heads DROP CONSTRAINT registrar_heads_pkey;
       public            postgres    false    219            z           2606    16783    students students_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.students DROP CONSTRAINT students_pkey;
       public            postgres    false    215            �           2620    16795 .   department_heads before_insert_department_head    TRIGGER     �   CREATE TRIGGER before_insert_department_head BEFORE INSERT ON public.department_heads FOR EACH ROW EXECUTE FUNCTION public.generate_email();
 G   DROP TRIGGER before_insert_department_head ON public.department_heads;
       public          postgres    false    217    222            �           2620    16805 ,   registrar_heads before_insert_registrar_head    TRIGGER     �   CREATE TRIGGER before_insert_registrar_head BEFORE INSERT ON public.registrar_heads FOR EACH ROW EXECUTE FUNCTION public.generate_email();
 E   DROP TRIGGER before_insert_registrar_head ON public.registrar_heads;
       public          postgres    false    222    219            �           2620    16785    students before_insert_student    TRIGGER     }   CREATE TRIGGER before_insert_student BEFORE INSERT ON public.students FOR EACH ROW EXECUTE FUNCTION public.generate_email();
 7   DROP TRIGGER before_insert_student ON public.students;
       public          postgres    false    222    215            �           2620    16811 .   department_heads before_update_department_head    TRIGGER     �   CREATE TRIGGER before_update_department_head BEFORE UPDATE ON public.department_heads FOR EACH ROW EXECUTE FUNCTION public.generate_email();
 G   DROP TRIGGER before_update_department_head ON public.department_heads;
       public          postgres    false    222    217            �           2620    16810 ,   registrar_heads before_update_registrar_head    TRIGGER     �   CREATE TRIGGER before_update_registrar_head BEFORE UPDATE ON public.registrar_heads FOR EACH ROW EXECUTE FUNCTION public.generate_email();
 E   DROP TRIGGER before_update_registrar_head ON public.registrar_heads;
       public          postgres    false    219    222            �           2620    16812    students before_update_student    TRIGGER     }   CREATE TRIGGER before_update_student BEFORE UPDATE ON public.students FOR EACH ROW EXECUTE FUNCTION public.generate_email();
 7   DROP TRIGGER before_update_student ON public.students;
       public          postgres    false    222    215            �           2606    16827    students fk_program    FK CONSTRAINT     �   ALTER TABLE ONLY public.students
    ADD CONSTRAINT fk_program FOREIGN KEY (program_id) REFERENCES public.programs(id) ON DELETE SET NULL;
 =   ALTER TABLE ONLY public.students DROP CONSTRAINT fk_program;
       public          postgres    false    221    215    3200            �           2606    16832    department_heads fk_program    FK CONSTRAINT     �   ALTER TABLE ONLY public.department_heads
    ADD CONSTRAINT fk_program FOREIGN KEY (program_id) REFERENCES public.programs(id) ON DELETE SET NULL;
 E   ALTER TABLE ONLY public.department_heads DROP CONSTRAINT fk_program;
       public          postgres    false    3200    217    221               d   x�32�LI-(A#�@�CrYq�^A�^r~.��Q����JAbXIq������gqTZq��g�cjF�O�S�a�OZp��kPb^RYv@������iz�?�!W� ��"         ,   x�3�tJL�H��/R�OSp��-(-I-RN�L�KN����� ݥK         e   x�3�,JM�,�R`RL:$���d�%��r�%��X�g�UF�f�y��V$�����G��FWTy9E9Z[���W��q��qqq 9�!F         �   x�]��
�0 ����՟m��-Z"H���Hcm�9��>�N��-sc���o[5����{ c,���T�����0j��Ҕ�Sh�-��$��0�T�f�J��8���B��s��f�ae�C���EYtmeߨ��B>7k/
     
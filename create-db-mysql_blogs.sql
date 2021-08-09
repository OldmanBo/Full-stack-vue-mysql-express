DROP DATABASE IF EXISTS mysql_blogs;
CREATE DATABASE mysql_blogs;
USE mysql_blogs;


CREATE TABLE blogs (
	blog_id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    title varchar(255) NOT NULL,
    body text NOT NULL,
    body_snippet varchar(255),
    date_created datetime,
	PRIMARY KEY (blog_id)
);

INSERT INTO blogs (user_id, title, body, body_snippet, date_created) VALUES (
	1,
	'Blog Title 1', 
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequatur quae
quo, exercitationem mollitia adipisci a impedit sapiente consectetur, molestias
doloribus nostrum, nihil consequuntur veritatis perferendis doloremque dolores
odit fuga. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta,
voluptates autem non sequi enim veniam saepe officia dolorum qui placeat tenetur
exercitationem possimus ea. Rem deleniti maiores perferendis quis fugit cum.
Perferendis a, voluptate totam laboriosam beatae consequuntur architecto quidem
id cupiditate accusantium numquam repellendus tempore nam soluta ab eius velit
pariatur consectetur. Iure vitae delectus aperiam voluptatibus sint ullam eius
aliquam exercitationem ratione enim, odit sapiente, laboriosam accusantium
debitis nihil dolore eum explicabo veritatis, voluptas id vel. Modi quos nulla
quod, quisquam praesentium cum optio aspernatur quis fugiat ex neque illum
dolore esse commodi, ratione laborum voluptatum voluptas provident.',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem consequatur quae
quo, exercitationem mollitia adipisci a impedit sapiente consectetur',
    curdate()
),
(
	1,
	'Blog Title 2', 
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque doloribus
necessitatibus voluptatibus rem odit sint nemo mollitia est beatae vel.
Praesentium quasi rerum, asperiores quisquam mollitia hic placeat quos ab
repudiandae iusto id sapiente similique quia tempora perspiciatis amet quam
laborum recusandae odio laudantium facere, dolore saepe minima. Saepe pariatur
suscipit laboriosam distinctio, dignissimos quos magnam vel, repellat reiciendis
magni porro voluptatum voluptates voluptatibus amet incidunt et a quaerat
accusantium eum aspernatur! Esse omnis mollitia veniam nobis ipsa numquam
architecto deleniti doloremque, voluptatem perferendis nulla enim ipsum? At
tempora fugit ad, aut mollitia libero repellendus blanditiis itaque perspiciatis
cumque ipsam odio harum nesciunt culpa expedita dolore, et aliquam, ipsum nobis
ipsa quaerat dolorem ducimus aliquid. Tenetur architecto minus blanditiis
assumenda.',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque doloribus
necessitatibus voluptatibus',
    curdate()
),
(
	2,
	'Blog Title 3', 
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dolorum
laudantium similique cupiditate, voluptate omnis accusantium, iure consequatur
dignissimos tenetur mollitia tempore possimus minima dolores in! Dolor sit
aliquid nesciunt velit temporibus error natus, unde voluptas neque, laudantium
ullam distinctio et tempora quasi. Architecto fugit sed velit odio, maxime saepe
explicabo. Quidem veritatis nam repudiandae, doloremque quisquam fugit obcaecati
labore corrupti iste quam. Officia, nisi reiciendis vero quas expedita qui
recusandae veniam atque quod, odit sapiente blanditiis natus. Debitis est
explicabo amet odio? Fugiat, nulla quidem? Aperiam, dolor eius, possimus quasi
illo quaerat explicabo, impedit fugit labore expedita ad! Aut impedit laborum
quibusdam fuga quaerat vitae ut omnis quia alias odio, est dolor officiis
veritatis! Delectus harum nemo sint corrupti. Lorem ipsum dolor sit amet,
consectetur adipisicing elit. Atque cum expedita ullam eos amet libero delectus
numquam, alias ab at? Lorem ipsum dolor sit, amet consectetur adipisicing elit.
Dicta ex repellat tempora, natus velit harum vel ut suscipit? Eos sed sunt illum
impedit soluta natus!',
	'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti dolorum
laudantium similique cupiditate, voluptate...',
    curdate()
),
(
	3,
	'Blog Title 4', 
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem cupiditate
nisi consequatur, autem blanditiis molestiae esse nihil commodi, perspiciatis
cumque vitae quibusdam error harum aliquam non ratione? A sunt cumque non fuga
cum unde assumenda ex adipisci accusamus. Perspiciatis sequi maiores eos,
incidunt earum, reprehenderit asperiores quas, necessitatibus cum explicabo
ratione minus. Ipsum soluta aliquid iste fugiat, laboriosam incidunt, mollitia
quas inventore dolor saepe laborum dicta aut perferendis! Nostrum vero ducimus
velit neque nemo aperiam sapiente minima porro illo fugiat quas numquam,
tempora, veniam corrupti, saepe nobis. Consequuntur ea maxime odio assumenda vel
neque id perferendis impedit, obcaecati unde voluptatibus.',
	'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem cupiditate
nisi consequatur, autem blanditiis...',
    curdate()
);

CREATE TABLE users (
	user_id int NOT NULL AUTO_INCREMENT,
    user_name varchar(100) NOT NULL,
    first_name varchar(100) NOT NULL,
    last_name varchar(100) NOT NULL,
    email varchar(100) NOT NULL,
    password varchar(255) NOT NULL,
    bio text,
    birth_date date,
    phone_number varchar(50),
    img varchar(255),
    PRIMARY KEY (user_id)
);

INSERT INTO users (
	user_name,
    first_name, 
    last_name, 
    email,
    password,
    bio,
    birth_date,
    phone_number
) VALUES (
	'Brb',
	'Babara',
    'MacCaffrey',
    'brb@email.com',
    '$2a$08$3C2yWgDUV0NPR1Wo/312cel32onWCgWckVorAEvPjvpFCDD4szuRC',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque cum expedita ullam eos amet libero delectus numquam, alias ab at?',
    '1986-03-28',
    '00-000-0-000'
),
(
	'Ines',
	'Ines',
    'Brushfield',
    'ines@email.com',
    '$2a$08$MGP0zx76AHJfVnYqZbB8te2/b4tb75amzVwbjLFO4/mZRLihbxQfG',
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto amet accusantium eveniet facere, corrupti harum!',
    '1990-03-28',
    '11-000-1-0020'
),
(
	'Fred',
	'Freddi',
    'Boagey',
    'fred@email.com',
    '$2a$08$zUdyiXMsRdINYmw0mVP18eZU.bWedjQChuQtWzgx2Ul.u7leH30aa',
    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ex repellat tempora, natus velit harum vel ut suscipit? Eos sed sunt illum impedit soluta natus!',
    '1993-05-28',
    '13-020-1-0030'
)




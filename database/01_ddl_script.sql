create table access(
	user_code int4 not null, 
	access_email varchar(150) not null,
	access_password varchar(150) not null,
	access_uuid varchar(150) not null,
	CONSTRAINT pk_access primary key (user_code)
);
ALTER table access owner to user_espe;
create unique index index_email on access (access_email);

create table entry(
	entry_code serial not null, 
	user_code int4 not null, 
	entry_date date not null,
	entry_hour time not null,
	constrAINT pk_entry primary key(entry_code)
);
ALTER table entry owner to user_espe;

create table product(
	product_code serial not null, 
	product_type_code int4 not null,
	product_name varchar(150) not null,
	product_price decimal(10, 2) not null,
	constrAINT pk_product primary key(product_code)
);
ALTER table product owner to user_espe;

create table product_type(
	product_type_code serial not null, 
	product_type_name varchar(150) not null,
	constrAINT pk_product_type primary key(product_type_code)
);
ALTER table product_type owner to user_espe;

create table users(
	user_code serial not null, 
	user_name varchar(150) not null,
	user_lastname varchar(150) not null,
	constrAINT pk_users primary key(user_code)
);
ALTER table users owner to user_espe;
alter table access
	add constraint fk_access_ref_users foreign key(user_code)
	references users(user_code)
	on delete restrict on update cascade;

alter table entry
	add constraint fk_entry_ref_access foreign key(user_code)
	references access(user_code)
	on delete restrict on update cascade;

alter table product
	add constraint fk_product_ref_product_type foreign key(product_type_code)
	references product_type(product_type_code)
	on delete restrict on update cascade;
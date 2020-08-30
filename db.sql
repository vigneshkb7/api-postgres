create table restaurants(id bigserial not null primary key, name varchar(50) not null,location varchar(50) not null, price_range int not null check(price_range >= 1 and price_range <= 5));



insert into restaurants (name,location,price_range) values ('kfc','chennai',4);


DROP TABLE restaurants;


CREATE TABLE reviews( id bigserial not null primary key,restaurant_id bigint not null references restaurants(id),name varchar(50) not null, review text not null, rating int check(rating >=1 and rating <=5));


INSERT INTO reviews( restaurant_id, name, review, rating) values (1, 'dddd','dddfef',5);

select trunc(AVG(rating),3) AS average_review from reviews;


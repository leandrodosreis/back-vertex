#-----------------------------------------
# CRIANDO O DB
#-----------------------------------------
#drop database db_acme_pizzaria;

create database db_acme_pizzaria;

 use db_acme_pizzaria;
#-----------------------------------------
# TBL PIZZA
# TBL TIPO
# TBL_ADMINISTRADOR
#-----------------------------------------
CREATE TABLE tbl_pizza (
	id int not null auto_increment primary key,
	nome varchar(40) not null,
    descricao text not null,
    imagem varchar(255) not null
);

CREATE TABLE tbl_tipo (
	id int not null auto_increment primary key,
    nome varchar(20) not null
);

CREATE TABLE tbl_administrador (
	id int not null auto_increment primary key,
    senha varchar(512) not null,
    nome varchar(90) not null
);
#-----------------------------------------
# TBL_PIZZA_TIPO
#-----------------------------------------
CREATE TABLE tbl_pizza_tipo (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_pizza INT NOT NULL,
    id_tipo INT NOT NULL,

    CONSTRAINT fk_pizza_tipo_pizza
        FOREIGN KEY (id_pizza)
        REFERENCES tbl_pizza(id),

    CONSTRAINT fk_pizza_tipo_tipo
        FOREIGN KEY (id_tipo)
        REFERENCES tbl_tipo(id)
);
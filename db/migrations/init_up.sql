CREATE TABLE `slaia`.`members` (
  `id` INT NOT NULL,
  `nic` VARCHAR(20) NOT NULL,
  `name` VARCHAR(1000) NOT NULL,
  `address` VARCHAR(1000) NULL,
  `occupation` VARCHAR(1000) NULL,
  `date_of_join` DATETIME NOT NULL,
  `date_of_birth` DATETIME NOT NULL,
  `sex` VARCHAR(1) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `slaia`.`martialarts_career` (
  `id` INT NOT NULL,
  `member_id` INT NOT NULL,
  `martialart_id` INT NOT NULL,
  `from` DATETIME NULL,
  `rank` VARCHAR(100) NULL,
  `association` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `slaia`.`member_history` (
  `id` INT NOT NULL,
  `member_id` INT NULL,
  `promotion` VARCHAR(100) NULL,
  `date_of_promotion` DATETIME NULL,
  `certificate_no` VARCHAR(45) NULL,
  `promotion_fees` VARCHAR(1) NULL,
  `date_of_grading` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `slaia`.`member_payment_history` (
  `id` INT NOT NULL,
  `member_id` INT NULL,
  `description` VARCHAR(100) NULL,
  `ammount` DECIMAL(2) NULL,
  `date_of_payment` DATETIME NULL,
  `reciept_no` VARCHAR(100) NULL,
  `remarks` VARCHAR(1000) NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `slaia`.`member_history` 
ADD COLUMN `dojo` VARCHAR(1000) NULL AFTER `date_of_grading`,
ADD COLUMN `remarks` VARCHAR(1000) NULL AFTER `dojo`;

CREATE TABLE `slaia`.`dojo` (
  `id` INT NOT NULL,
  `location` VARCHAR(1000) NULL,
  `no_of_members` INT NULL,
  `main_instructor` VARCHAR(1000) NULL,
  `sub_instructor1` VARCHAR(1000) NULL,
  `sub_instructor2` VARCHAR(1000) NULL,
  `date_of_initiation` DATETIME NULL,
  `monthly_rental` DECIMAL(2) NULL,
  PRIMARY KEY (`id`));


CREATE TABLE `slaia`.`dojo_attendance` (
  `id` INT NOT NULL,
  `dojo_id` INT NULL,
  `date_of_class` DATETIME NULL,
  `instructor_id` INT NULL,
  `attendance` INT NULL,
  `fees_collected` DECIMAL(2) NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `slaia`.`member_attendance` (
  `id` INT NOT NULL,
  `member_id` INT NULL,
  `dojo_id` INT NULL,
  `date_of_practice` DATETIME NULL,
  `paid_amount` DECIMAL(2) NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `slaia`.`dojo_attendance` 
CHANGE COLUMN `date_of_class` `date_of_practice` DATETIME NULL DEFAULT NULL ;

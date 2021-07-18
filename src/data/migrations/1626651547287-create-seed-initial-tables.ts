import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import { Message } from '../entities/message.entity';
import { User } from '../entities/user.entity';
import messages from './seed/messages';
import users from './seed/users.json';

export class createSeedInitialTables1626651547287 implements MigrationInterface {
  name = 'createSeedInitialTables1626651547287';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "username" varchar NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "dateSent" datetime NOT NULL DEFAULT (datetime('now')), "senderId" integer NOT NULL, "recipientId" integer NOT NULL)`
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_message" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "dateSent" datetime NOT NULL DEFAULT (datetime('now')), "senderId" integer NOT NULL, "recipientId" integer NOT NULL, CONSTRAINT "FK_bc096b4e18b1f9508197cd98066" FOREIGN KEY ("senderId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_445b786f516688cf2b81b8981b6" FOREIGN KEY ("recipientId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`
    );
    await queryRunner.query(
      `INSERT INTO "temporary_message"("id", "text", "dateSent", "senderId", "recipientId") SELECT "id", "text", "dateSent", "senderId", "recipientId" FROM "message"`
    );
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`ALTER TABLE "temporary_message" RENAME TO "message"`);
    await this.seed();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "message" RENAME TO "temporary_message"`);
    await queryRunner.query(
      `CREATE TABLE "message" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "dateSent" datetime NOT NULL DEFAULT (datetime('now')), "senderId" integer NOT NULL, "recipientId" integer NOT NULL)`
    );
    await queryRunner.query(
      `INSERT INTO "message"("id", "text", "dateSent", "senderId", "recipientId") SELECT "id", "text", "dateSent", "senderId", "recipientId" FROM "temporary_message"`
    );
    await queryRunner.query(`DROP TABLE "temporary_message"`);
    await queryRunner.query(`DROP TABLE "message"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }

  private async seed(): Promise<void> {
    await getRepository(User).save(users as User[]);
    await getRepository(Message).save(messages);
  }
}

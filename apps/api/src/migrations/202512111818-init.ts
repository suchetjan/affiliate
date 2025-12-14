import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1765452423175 implements MigrationInterface {
  name = 'Init1765452423175';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Product table
    await queryRunner.query(`
            CREATE TABLE "product" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "title" varchar NOT NULL,
                "image_url" varchar NOT NULL,
                CONSTRAINT "PK_product_id" PRIMARY KEY ("id")
            );
        `);

    // Offer table
    await queryRunner.query(`
            CREATE TABLE "offer" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "product_id" uuid NOT NULL,
                "marketplace" varchar NOT NULL,
                "store_name" varchar NOT NULL,
                "price" numeric NOT NULL,
                "last_checked_at" timestamptz,
                CONSTRAINT "PK_offer_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_offer_product" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE
            );
        `);

    // Campaign table
    await queryRunner.query(`
            CREATE TABLE "campaign" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "name" varchar NOT NULL,
                "utm_campaign" varchar NOT NULL,
                "start_at" timestamptz,
                "end_at" timestamptz,
                CONSTRAINT "PK_campaign_id" PRIMARY KEY ("id")
            );
        `);

    // Link table
    await queryRunner.query(`
            CREATE TABLE "link" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "product_id" uuid NOT NULL,
                "campaign_id" uuid NOT NULL,
                "short_code" varchar NOT NULL,
                "target_url" varchar NOT NULL,
                CONSTRAINT "PK_link_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_link_product" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_link_campaign" FOREIGN KEY ("campaign_id") REFERENCES "campaign"("id") ON DELETE CASCADE
            );
        `);

    // Click table
    await queryRunner.query(`
            CREATE TABLE "click" (
                "id" uuid NOT NULL DEFAULT gen_random_uuid(),
                "link_id" uuid NOT NULL,
                "timestamp" timestamptz NOT NULL DEFAULT NOW(),
                "referrer" varchar,
                "user_agent" varchar,
                CONSTRAINT "PK_click_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_click_link" FOREIGN KEY ("link_id") REFERENCES "link"("id") ON DELETE CASCADE
            );
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Reverse order (FK dependencies)
    await queryRunner.query(`DROP TABLE "click";`);
    await queryRunner.query(`DROP TABLE "link";`);
    await queryRunner.query(`DROP TABLE "campaign";`);
    await queryRunner.query(`DROP TABLE "offer";`);
    await queryRunner.query(`DROP TABLE "product";`);
  }
}

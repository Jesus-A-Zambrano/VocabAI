// src/seed-vocabulary.ts
import "reflect-metadata";
import { createReadStream } from "fs";
import csv from "csv-parser";
import { AppDataSource } from "./data-source";
import { Vocabulary } from "./entity/Vocabulary";

async function runSeed() {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const batchSize = 200;
    let batch: Partial<Vocabulary>[] = [];

    await new Promise<void>((resolve, reject) => {
      createReadStream("../../data/vocabulary_final.csv")
        .pipe(csv({ mapHeaders: ({ header }) => header.trim() }))
        .on("data", (row: any) => {
          batch.push({
            word:           row["word"],
            translation:    row["word_in_spanish"],
            description:    row["descripcion"],
            types:          row["category_titles"],
            level:          row["nivel"],
            frequencyCount: parseInt(row["frequency_count"], 10) || 0,
          });

          if (batch.length >= batchSize) {
            queryRunner.manager
              .createQueryBuilder()
              .insert()
              .into(Vocabulary)
              .values(batch)
              .execute();
            batch = [];
          }
        })
        .on("end", async () => {
          if (batch.length) {
            await queryRunner.manager
              .createQueryBuilder()
              .insert()
              .into(Vocabulary)
              .values(batch)
              .execute();
          }
          await queryRunner.commitTransaction();
          console.log("✔️ Seed completado con frecuencia");
          resolve();
        })
        .on("error", err => reject(err));
    });

  } catch (err) {
    console.error("❌ Error en seed:", err);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
    await AppDataSource.destroy();
    process.exit(0);
  }
}

runSeed();

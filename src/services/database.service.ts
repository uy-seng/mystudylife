import { Connection, createConnection } from "typeorm";

interface Entity {
  name: string;
  tableName: string;
}

export class DatabaseService {
  private connection: Connection;

  private async getEntities() {
    const entities: Entity[] = [];
    (await this.connection.entityMetadatas).forEach((x) =>
      entities.push({ name: x.name, tableName: x.tableName })
    );
    return entities;
  }

  private async cleanDatabase(entities: Entity[]) {
    try {
      for (const entity of entities) {
        const repository = await this.connection.getRepository(entity.name);
        const SQLCommand = `TRUNCATE TABLE ${entity.tableName} RESTART IDENTITY CASCADE;`;
        await repository.query(SQLCommand);
      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  }

  public async init() {
    this.connection = await createConnection("development");
    console.log("Database initialized...");
    const CLEAN_DB = false;
    /**
     * comment the four line below for cleaning database
     */
    const entities: Entity[] = await this.getEntities();
    if (entities && CLEAN_DB) {
      this.cleanDatabase(entities);
      console.log("Database cleaned...");
    }
  }
}

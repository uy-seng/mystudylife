import { createConnection } from "typeorm";
export class DatabaseService {
    async getEntities() {
        const entities = [];
        (await this.connection.entityMetadatas).forEach((x) => entities.push({ name: x.name, tableName: x.tableName }));
        return entities;
    }
    async cleanDatabase(entities) {
        try {
            for (const entity of entities) {
                const repository = await this.connection.getRepository(entity.name);
                const SQLCommand = `TRUNCATE TABLE ${entity.tableName} RESTART IDENTITY CASCADE;`;
                await repository.query(SQLCommand);
            }
        }
        catch (error) {
            throw new Error(`ERROR: Cleaning test db: ${error}`);
        }
    }
    async init() {
        this.connection = await createConnection(`${process.env.NODE_ENV}`);
        console.log("Database initialized...");
        const CLEAN_DB = false;
        const entities = await this.getEntities();
        if (entities && CLEAN_DB) {
            this.cleanDatabase(entities);
            console.log("Database cleaned...");
        }
    }
}
//# sourceMappingURL=database.service.js.map
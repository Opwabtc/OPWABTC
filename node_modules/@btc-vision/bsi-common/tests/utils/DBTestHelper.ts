import { Db, ObjectId } from 'mongodb';
import * as fs from 'fs';
import * as path from 'path';

export class DBTestHelper {
    public static async setupDatabaseForTests(db: Db,
        testDirectory: string,
        collectionName: string) {
        const fullPath = path.join(testDirectory, `${collectionName}.json`);
        
        console.log(`Reading: ${fullPath}`);
        const data = fs.readFileSync(fullPath, "utf-8");
        const documents: any[] = JSON.parse(data);
        const updatedDocuments = documents.map(doc => ({
            ...doc,
            _id: new ObjectId(doc._id),
        }));

        console.log(`Cleaning to collection: ${collectionName}`);
        await db.collection(`${collectionName}`).deleteMany();

        console.log(`Importing to collection: ${collectionName}`);
        await db.collection(`${collectionName}`).insertMany(updatedDocuments);
    }
}
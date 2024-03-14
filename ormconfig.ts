import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'qwerty123',
    database: 'postgres2',
    entities: ['dist/src/**/*.entity.js'],
    synchronize: true,
}

export default config
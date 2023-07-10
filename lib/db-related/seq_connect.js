import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.PGDATABASE,
    process.env.PGUSER,
    process.env.PGPASSWORD, 
    {
        host: process.env.PGHOST,
        dialect: "postgres",
        protocol: "postgres"
    }
);

sequelize.authenticate()
.catch((err) => {
    console.error("Unable to connect to the database:", err);
});

export default sequelize;

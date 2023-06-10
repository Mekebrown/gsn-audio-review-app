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

sequelize.sync({ alter: true })
.then(() => {
    return sequelize.authenticate();
})
.then(() => {
    console.log("Connection has been established successfully.");
})
.catch((err) => {
    console.error("Unable to connect to the database:", err);
});

export default sequelize;

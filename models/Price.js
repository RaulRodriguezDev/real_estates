import db from "../config/db.js"
import { DataTypes } from "sequelize";

const Price = db.define("prices", {
    name: {
        type: DataTypes.STRING(30),
        allowNull: false,
    }
    })

export default Price;